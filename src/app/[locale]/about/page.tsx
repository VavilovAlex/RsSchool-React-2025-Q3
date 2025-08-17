import TextLink from "@components/link/TextLink.tsx";

export default function Page() {
  return (
    <div className={"w-full h-full flex flex-col items-center justify-center"}>
      <div className={"p-4 bg-blue-100 rounded"}>
        <title>About</title>
        <div className={"text-xl"}>About page</div>
        <div>My name is Alex</div>
        <TextLink href={"https://rs.school/courses/reactjs"} target={"_blank"}>
          Rs School
        </TextLink>
      </div>
    </div>
  );
}
