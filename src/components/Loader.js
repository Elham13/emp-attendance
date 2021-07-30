import Skeleton from "@material-ui/lab/Skeleton";

export default function Loader({ number }) {
  return (
    <div className='loader'>
      {[...Array(number).keys()].map((n) => (
        <Skeleton key={n} />
      ))}
    </div>
  );
}
