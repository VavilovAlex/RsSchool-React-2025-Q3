import { useState } from "react";
import "./App.css";
import Modal from "@components/modal";
import Button from "@components/button";
import UncontrolledForm from "@components/forms/uncontrolled";
import ControlledForm from "@components/forms/controlled";

function App() {
  const [isUncontrolledModalOpen, setUncontrolledIsModalOpen] = useState(false);
  const [isControlledModalOpen, setIsControlledModalOpen] = useState(false);

  return (
    <>
      <div className={"w-screen h-screen flex justify-center items-center"}>
        <div className={"flex gap-4"}>
          <Button onClick={() => setUncontrolledIsModalOpen(true)}>
            Open Uncontrolled Modal
          </Button>

          <Button onClick={() => setIsControlledModalOpen(true)}>
            Open Controlled Modal
          </Button>
        </div>
      </div>

      <Modal
        isOpen={isUncontrolledModalOpen}
        onClose={() => setUncontrolledIsModalOpen(false)}
      >
        <div className="p-4">
          <div className="mb-2 text-lg font-semibold">Uncontrolled Modal</div>
          <div>
            <UncontrolledForm
              onCancel={() => setUncontrolledIsModalOpen(false)}
            />
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isControlledModalOpen}
        onClose={() => setIsControlledModalOpen(false)}
      >
        <div className="p-4">
          <div className="mb-2 text-lg font-semibold">Controlled Modal</div>
          <div>
            <ControlledForm onCancel={() => setIsControlledModalOpen(false)} />
          </div>
        </div>
      </Modal>
    </>
  );
}

export default App;
