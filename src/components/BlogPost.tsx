import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';



const BlogPost: React.FC = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [posts, setPosts] = useState([] as any)
    //const timeStamp = new Date().toLocaleTimeString();


    useEffect(() => {
        if (posts.length > 0) {
            const latestPost = posts[posts.length - 1]; 
            localStorage.setItem("latestPost", JSON.stringify(latestPost));
            console.log('Post stored in Local Storage')
          }

    }, [posts])

    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (title && body) {
            const newPost = {
                title,
                body,
                timeStamp: new Date().toLocaleString(),  
            };

            setPosts(prevPosts => [...prevPosts, newPost])

            setTitle('')
            setBody('')
        }
        
    }


    return (
        <div>
            <h1>Welcome to The Blog</h1>
            <br />
            <h3>Start a Topic Here:</h3>

            <form onSubmit={handleSubmit}>
                <label>Title of Your Post</label><br />
                <input 
                    type="text"
                    name='title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} 
                    required /><br />
                
                <label>What's Your Post About:</label><br />
                
                <textarea 
                    name='body'
                    value={body}
                    onChange={(e) => setBody(e.target.value)} 
                    required/><br />
                    
                <button type='submit'>Submit Post</button>
                </form>


            {posts.map((post) => (
                <div key={post.index}>
                <Card className="text-center">
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Text>
                    {post.body}
                  </Card.Text>
                  
                </Card.Body>
                <Card.Footer className="text-muted">{post.timeStamp}</Card.Footer>
              </Card>
              </div>
            ))}
        </div>
    )

};


export default BlogPost;