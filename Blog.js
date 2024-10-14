import React, { useState } from 'react';
import './Blog.css'; // Import the CSS file for styling
import Editor from './Editor'; // Import the Editor component

const Blog = () => {
    const [posts, setPosts] = useState([
        {
            id: 1,
            title: 'First Blog Post',
            content: 'This is the content of the first blog post.',
            tags: ['general', 'introduction'],
            date: new Date().toISOString().split('T')[0], // Default date format
        },
        {
            id: 2,
            title: 'Second Blog Post',
            content: 'This is the content of the second blog post.',
            tags: ['update', 'news'],
            date: new Date().toISOString().split('T')[0], // Default date format
        },
    ]);

    const [newPost, setNewPost] = useState({
        title: '',
        content: '',
        tags: '',
        date: new Date().toISOString().split('T')[0], // Default date format
    });

    const [searchQuery, setSearchQuery] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [postIdToEdit, setPostIdToEdit] = useState(null);
    const [showSearch, setShowSearch] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [showPosts, setShowPosts] = useState(false);
    const [showEditor, setShowEditor] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewPost({
            ...newPost,
            [name]: value,
        });
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editMode) {
            const updatedPosts = posts.map((post) =>
                post.id === postIdToEdit ? { ...post, ...newPost, tags: newPost.tags.split(','), date: newPost.date } : post
            );
            setPosts(updatedPosts);
            setEditMode(false);
            setPostIdToEdit(null);
        } else {
            const newId = posts.length ? posts[posts.length - 1].id + 1 : 1;
            const postToAdd = {
                id: newId,
                ...newPost,
                tags: newPost.tags.split(','),
            };
            setPosts([...posts, postToAdd]);
        }
        setNewPost({ title: '', content: '', tags: '', date: new Date().toISOString().split('T')[0] });
        setShowForm(false); // Hide the form after submitting
    };

    const handleEdit = (postId) => {
        const postToEdit = posts.find((post) => post.id === postId);
        setNewPost({ title: postToEdit.title, content: postToEdit.content, tags: postToEdit.tags.join(','), date: postToEdit.date });
        setEditMode(true);
        setPostIdToEdit(postId);
        setShowForm(true); // Show the form for editing
    };

    const handleDelete = (postId) => {
        setPosts(posts.filter((post) => post.id !== postId));
    };

    const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.join(' ').toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="blog">
            <h1>Notes</h1>
            <div className="button-group">
                <button onClick={() => setShowSearch(!showSearch)}>
                    {showSearch ? 'Hide Search' : 'Show Search'}
                </button>
                <button onClick={() => setShowForm(!showForm)}>
                    {showForm ? (editMode ? 'Cancel Edit' : 'Hide Form') : (editMode ? 'Edit Post' : 'Add New Post')}
                </button>
                <button onClick={() => setShowPosts(!showPosts)}>
                    {showPosts ? 'Hide Posts' : 'Show Posts'}
                </button>
                <button onClick={() => setShowEditor(!showEditor)}>
                    {showEditor ? 'Hide Editor' : 'Show Editor'}
                </button>
            </div>
            {showSearch && (
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search posts..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
            )}
            {showPosts && (
                <div className="blog-posts">
                    {filteredPosts.map((post) => (
                        <div key={post.id} className="blog-post">
                            <h2>{post.title}</h2>
                            <p>{post.content}</p>
                            <p><strong>Tags:</strong> {post.tags.join(', ')}</p>
                            <p><strong>Date:</strong> {new Date(post.date).toLocaleDateString()}</p>
                            <button onClick={() => handleEdit(post.id)}>Edit</button>
                            <button onClick={() => handleDelete(post.id)}>Delete</button>
                        </div>
                    ))}
                </div>
            )}
            {showForm && (
                <div>
                    <h2>{editMode ? 'Edit Post' : 'Add a New Post'}</h2>
                    <form className="blog-form" onSubmit={handleSubmit}>
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={newPost.title}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="content">Content:</label>
                        <textarea
                            id="content"
                            name="content"
                            value={newPost.content}
                            onChange={handleChange}
                            rows="5"
                            required
                        />
                        <label htmlFor="tags">Tags (comma-separated):</label>
                        <input
                            type="text"
                            id="tags"
                            name="tags"
                            value={newPost.tags}
                            onChange={handleChange}
                        />
                        <label htmlFor="date">Date:</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={newPost.date}
                            onChange={handleChange}
                            required
                        />
                        <button type="submit">{editMode ? 'Update Post' : 'Add Post'}</button>
                    </form>
                </div>
            )}
            {showEditor && <Editor />}
        </div>
    );
};

export default Blog;
