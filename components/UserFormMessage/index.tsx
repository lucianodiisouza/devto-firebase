type UsernameMessageProps = {
  username?: string;
  isValid?: boolean;
  loading?: boolean;
};

const UsernameMessage = ({
  username,
  isValid,
  loading,
}: UsernameMessageProps) => {
  if (loading) {
    return <p>Checking ...</p>;
  } else if (isValid) {
    return <p className="text-success">{username} is available!</p>;
  } else if (username && !isValid) {
    return <p className="text-danger">That username is already taken!</p>;
  } else {
    return <p></p>;
  }
};

export default UsernameMessage;
