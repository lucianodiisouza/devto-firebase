import { Loader } from "components";
import toast from "react-hot-toast";

export default function Home() {
  return (
    <div>
      <Loader show={false} />
      <button onClick={() => toast.success("Really easy!")}>Toast</button>
    </div>
  );
}
