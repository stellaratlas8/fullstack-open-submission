const Notification = ({ success, message }) => {
  if(message === null) return null
  return (
    <div className={`notification ${success ? "success" : "error"}`}>
      <p>{message}</p>
    </div>
  );
};

export default Notification;
