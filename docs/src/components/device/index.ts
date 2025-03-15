import dynamic from "next/dynamic";

const Device = dynamic(() => import("./device"), { ssr: false });

export default Device;
