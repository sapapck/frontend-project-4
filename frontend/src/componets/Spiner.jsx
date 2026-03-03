const Spiner = () => {
  return (
    <div className="col p-0 h-100 d-flex justify-content-center align-items-center">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Загрузка...</span>
      </div>
      <span className="ms-3">Загрузка сообщений...</span>
    </div>
  );
};
export default Spiner;
