import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BlogPost from '../components/BlogPost';


describe('BlogPost', () => {
    it('renders correctly', () => {
        render(
            <BlogPost />
        )

    expect(screen.getByText('Welcome to The Blog')).toBeInTheDocument();
    expect(screen.getByText('Start a Topic Here:')).toBeInTheDocument();
    expect(screen.getByLabelText(/Title of Your Post/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/What's Your Post About:/i)).toBeInTheDocument();
    expect(screen.getByText(/Submit Post/i)).toBeInTheDocument()
    });
  
    it('handles input changes', () => {
      render(
        <BlogPost />
      )
      //get the input and text elements
      const titleInput = screen.getByLabelText(/Title of Your Post/i);
      const bodyInput = screen.getByLabelText(/What's Your Post About:/i);
      //simulate typing into the input fields
      fireEvent.change(titleInput, { target: { value: 'Test Post' } });
      fireEvent.change(bodyInput, { target: { value: 'Test post body.' } });
      //check if values are updated in the state
      expect(titleInput).toBe('Test Post');
      expect(bodyInput).toBe('This is a test post body.');

    });
  
    it('submits the form and stores comment in localStorage', () => {

        const localStorageMock = (function () {
            let store: any = {};
            return {
              getItem: (key: string) => store[key] || null,
              setItem: (key: string, value: string) => {
                store[key] = value;
              },
              clear: () => {
                store = {};
              },
            };
          })();
        
          Object.defineProperty(window, 'localStorage', {
            value: localStorageMock,
          });

      render(
        <BlogPost />
      )

      const titleInput = screen.getByLabelText(/Title of Your Post/i);
      const bodyInput = screen.getByLabelText(/What's Your Post About:/i);
      const submitButton = screen.getByText(/Submit Post/i);

      fireEvent.change(titleInput, { target: { value: 'Test Post' } });
      fireEvent.change(bodyInput, { target: { value: 'Test post body.' } });
      fireEvent.click(submitButton);

      expect(localStorage.setItem).toHaveBeenCalledWith(
        'latestPost',
        JSON.stringify({ title: 'Test Post', body: 'Test post body.' })
      );

    });

  });
