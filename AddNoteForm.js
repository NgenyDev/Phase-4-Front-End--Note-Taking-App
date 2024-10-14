// src/components/AddNoteForm.js
import React, { useState } from 'react';

const AddNoteForm = () => {
    const [note, setNote] = useState({
        title: '',
        content: '',
        tags: '',
        userId: '1', // Replace with actual user ID if needed
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNote({
            ...note,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Convert tags from comma-separated to an array
        const noteToAdd = {
            ...note,
            tags: note.tags.split(',').map(tag => tag.trim()),
        };

        // Send POST request to JSON Server
        try {
            const response = await fetch('http://localhost:5000/notes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(noteToAdd),
            });

            if (!response.ok) {
                throw new Error('Failed to add note');
            }

            const result = await response.json();
            console.log('Note added:', result);
        } catch (error) {
            console.error('Error adding note:', error);
        }

        // Reset form
        setNote({
            title: '',
            content: '',
            tags: '',
            userId: '1', // Reset user ID if necessary
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Title:
                <input
                    type="text"
                    name="title"
                    value={note.title}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                Content:
                <textarea
                    name="content"
                    value={note.content}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                Tags (comma-separated):
                <input
                    type="text"
                    name="tags"
                    value={note.tags}
                    onChange={handleChange}
                />
            </label>
            <button type="submit">Add Note</button>
        </form>
    );
};

export default AddNoteForm;
