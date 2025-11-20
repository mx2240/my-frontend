import React from "react";

const DeleteCourseModal = ({ isOpen, onClose, onConfirm, courseTitle }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded shadow-lg w-96 p-6">
                <h2 className="text-xl font-bold mb-4">Delete Course</h2>
                <p className="mb-6">
                    Are you sure you want to delete the course <strong>{courseTitle}</strong>?
                    This action cannot be undone.
                </p>

                <div className="flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteCourseModal;
