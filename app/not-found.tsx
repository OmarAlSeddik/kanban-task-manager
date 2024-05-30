const NotFound = () => {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-4">
      <h1 className="text-5xl font-bold">404</h1>
      <h2 className="text-xl">
        Page does not exist or you are not authorized to access.
      </h2>
    </main>
  );
};

export default NotFound;
