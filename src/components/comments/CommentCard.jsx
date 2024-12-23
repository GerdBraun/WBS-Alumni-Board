const CommentCard = ({ comment }) => {
  return (
    <div className="card bg-base-300 w-full shadow-xl mb-2">
      <div className="card-body p-4">
        <h2 className="card-title text-sm">by {comment.User.firstName} {comment.User.lastName} / {new Date(comment.updatedAt).toLocaleDateString()}</h2>
        <p className=" text-sm">
        {comment.text}
        </p>
      </div>
    </div>
  );
};

export default CommentCard;
