const Spiner = () => {
    return (
      <div className="d-flex justify-content-center align-items-center h-100">
          <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
            <span className="visually-hidden">Загрузка...</span>
          </div>
        </div>
    );
}
export default Spiner;