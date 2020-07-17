export default function instacnceInit() {
  let instacnce;
  return (newInstance) => {
    if (newInstance) {
      instacnce = newInstance;
    }
    Object.seal(instacnce);
    return instacnce;
  };
}
