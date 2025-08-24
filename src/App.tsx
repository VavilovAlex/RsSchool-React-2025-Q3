import { useState } from "react";
import "./App.css";
import Modal from "@components/modal";
import Button from "@components/button";
import UncontrolledForm from "@components/forms/uncontrolled";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-4">
          <div className="mb-2 text-lg font-semibold">Test Modal</div>
          <div>
            <UncontrolledForm onCancel={() => setIsModalOpen(false)} />
          </div>
        </div>
      </Modal>
    </>
  );
}

export default App;
