import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableTwo from "@/components/table/Table";

const AdminProduct = () => {
  return (
    <>
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10">
        <TableTwo />
      </div>
    </>
  );
};

export default AdminProduct;
