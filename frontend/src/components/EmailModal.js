// frontend/src/components/EmailModal.js
'use client';
export default function EmailModal({ isOpen, onClose, onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    onSubmit(email);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Enter your email</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            required
            className="border p-2 w-full mb-4"
            placeholder="Your email address"
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Continue to Tickets
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}