import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';

const QAForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { token, appUser } = useApp();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //validation
    if (title.length > 30) {
        alert("Title must be 30 characters or fewer.");
        return;
      }

    const newQuestion = { title, description, ownerId: appUser?.id };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_SERVER}/questions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newQuestion),
      });

      if (response.ok) {
        alert('Question submitted successfully!');
        navigate('/qa');
      } else {
        const errorData = await response.json();
        console.error('Failed to submit question:', errorData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Ask a New Question</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea textarea-bordered w-full"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit Question
        </button>
      </form>
    </div>
  );
};

export default QAForm;
