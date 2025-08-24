import { useState } from "react";
import "./App.css";
import Modal from "./components/Modal";
import Button from "@components/button/Button.tsx";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-4">
          <div className="mb-2 text-lg font-semibold">Test Modal</div>
          <div className="flex justify-end gap-2">
            <Button onClick={() => setIsModalOpen(false)}>Close</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default App;
