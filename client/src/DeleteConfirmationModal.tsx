interface DeleteConfirmationModalProps {
  onClose: () => void;
  onDelete: () => void;
  loading_delete: boolean;
}
const DeleteConfirmationModal = ({
  onClose,
  onDelete,
  loading_delete,
}: DeleteConfirmationModalProps) => {
  return (
    // design delete confirmation modal with a message and two buttons "Cancel" and "Delete"
    <div className="delete-confirmation-modal">
      <div className="modal-content">
        <h2>Are you sure you want to delete this image?</h2>
        <p>This action cannot be undone.</p>
        <div className="button-container">
          <button className="cancel-button" onClick={() => onClose()}>
            Cancel
          </button>
          <button
            className="confirm-button"
            onClick={() => onDelete()}
            disabled={loading_delete}
          >
            {loading_delete ? (
              <>
                <div className="loader"></div>
                <span>Deleting...</span>
              </>
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
