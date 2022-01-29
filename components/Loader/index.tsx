import { LoaderProps } from "./types";

export default function Loader({ show }: LoaderProps) {
  return show && <div className="loader"></div>;
}
