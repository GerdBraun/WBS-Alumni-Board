const CommentCard = ({ comment }) => {
  return (
    <div className="card bg-base-100 w-full shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{comment.User.firstName} / {comment.createdAt}</h2>
        <p>
        {comment.text}
        </p>
      </div>
    </div>
  );
};

export default CommentCard;