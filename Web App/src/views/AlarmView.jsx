import { Button } from "@/components/ui/button";

function AlarmView({}) {
  return (
    <div className="bg-[#0b2342] h-screen">
      <div className="flex flex-row justify-center place-items-center items-center pt-100 ">
        <Button className="text-white my-8">+</Button>
        <div className="text-white text-4xl px-4">13</div>
        <Button className="text-white items-center ">-</Button>
        <div className="text-white text-4xl px-4">:</div>
        <Button className="text-white my-8">+</Button>
        <div className="text-white text-4xl px-4">37</div>
        <Button className="text-white items-center ">-</Button>
      </div>
    </div>
  );
}

export default AlarmView;
