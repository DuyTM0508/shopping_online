interface Props {
  sizes: Map<string, number>;
}

const ProductSizes = ({ sizes }: Props) => {
  const sizeID = Date.now();

  return (
    <>
      <div className="mt-4 flex items-center justify-between">
        <h6 className="mb-0">Size</h6>
        <a href="#" className="text-body mb-0">
          Size guide
        </a>
      </div>
      <div className="my-4 flex flex-wrap text-center">
        {Object.entries(sizes).map(([size, amount], i) => (
          <div className="mb-3 me-3">
            <div className="form-check">
              {amount != 0 ? (
                <input
                  className="form-check-input rounded-2"
                  type="radio"
                  name="flexRadioDefault"
                  id={`input` + sizeID + i}
                />
              ) : (
                <input
                  className="form-check-input rounded-2"
                  disabled
                  type="radio"
                  name="flexRadioDefault"
                  id={`input` + sizeID + i}
                />
              )}
              <label className="cursor-pointer" htmlFor={`input` + sizeID + i}>
                {size}
              </label>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductSizes;
