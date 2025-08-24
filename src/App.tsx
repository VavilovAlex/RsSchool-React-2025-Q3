import { useMemo, useState } from "react";
import "./App.css";
import Modal from "@components/modal";
import Button from "@components/button";
import UncontrolledForm from "@components/forms/uncontrolled";
import ControlledForm from "@components/forms/controlled";
import { useAppSelector } from "@/hooks/redux.ts";

function App() {
  const [isUncontrolledModalOpen, setUncontrolledIsModalOpen] = useState(false);
  const [isControlledModalOpen, setIsControlledModalOpen] = useState(false);

  const items = useAppSelector((s) => s.submissions.items);
  const lastAddedId = useAppSelector((s) => s.submissions.lastAddedId);

  const hasItems = useMemo(() => items.length > 0, [items.length]);

  return (
    <>
      <div
        className={"w-screen min-h-screen flex flex-col items-center p-6 gap-6"}
      >
        <div className={"flex gap-4"}>
          <Button onClick={() => setUncontrolledIsModalOpen(true)}>
            Open Uncontrolled Modal
          </Button>

          <Button onClick={() => setIsControlledModalOpen(true)}>
            Open Controlled Modal
          </Button>
        </div>

        <div className="w-full max-w-5xl">
          {hasItems && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((it) => (
                <div
                  key={it.id}
                  className={
                    "border rounded-md p-3 bg-white shadow-sm transition-all " +
                    (lastAddedId === it.id ? " ring-4 ring-emerald-400" : "")
                  }
                >
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                      <img
                        src={it.attachment}
                        alt={"Attachment for " + it.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold truncate">{it.name}</div>
                      <div className="text-sm text-gray-600 truncate">
                        {it.email}
                      </div>
                      <div className="text-xs text-gray-500">{it.gender}</div>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    <span className="mr-2">Age: {it.age}</span>
                    <span>Country: {it.country}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
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
