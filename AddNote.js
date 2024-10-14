import React, { useState, useEffect } from 'react';

function AddNote() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const [userId, setUserId] = useState(null); // Initialize userId state

    // Fetch userId from localStorage or global state
    useEffect(() => {
        const storedUserId = localStorage.getItem('userId'); // Example using localStorage
        if (storedUserId) {
            setUserId(parseInt(storedUserId, 10));
        }
    }, []);

    const handleAddNote = async (e) => {
        e.preventDefault();

        if (userId === null) {
            alert('User not logged in');
            return;
        }

        const note = {
            title,
            content,
            tags: tags.split(',').map(tag => tag.trim()),
            userId
        };

        const response = await fetch('http://localhost:5000/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(note),
        });

        const data = await response.json();
        if (data) {
            // Handle successful note addition
            console.log('Note added:', data);
            setTitle('');
            setContent('');
            setTags('');
        }
    };

    return (
        <form onSubmit={handleAddNote}>
            <label>Title</label>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <label>Content</label>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
            />
            <label>Tags (comma-separated)</label>
            <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
            />
            <button type="submit">Add Note</button>
        </form>
    );
}

export default AddNote;
