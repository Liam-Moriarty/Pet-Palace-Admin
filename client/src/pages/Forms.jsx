import { AdoptionForm } from "../component/index";

const Forms = () => {
  return (
    <section className="w-full h-screen flex gap-5 padding overflow-auto">
      <AdoptionForm />

      {/* Team Form */}
      <div className="bg-slate-700 w-full">
        <h1>Adoption Form</h1>
      </div>
    </section>
  );
};

export default Forms;
