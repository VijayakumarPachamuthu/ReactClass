import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "../Slice/CounterSlice";

function Counts() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="container mt-5">
      <div className="card p-4 text-center shadow-sm">
        <h4 className="mb-4">Counter</h4>

        <div className="d-flex justify-content-center align-items-center gap-3">
          <button
            className="btn btn-success"
            aria-label="Increment value"
            onClick={() => dispatch(increment())}
          >
            Increment
          </button>

          <span className="fs-4">{count}</span>

          <button
            className="btn btn-danger"
            aria-label="Decrement value"
            onClick={() => dispatch(decrement())}
          >
            Decrement
          </button>
        </div>
      </div>
    </div>
  );
}

export default Counts;
