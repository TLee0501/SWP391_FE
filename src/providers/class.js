import { createContext } from "react";

const initialValue = {};

const ClassContext = createContext(initialValue);

const ClassProvider = ({ data, children }) => {
	return <ClassContext.Provider value={data}>{children}</ClassContext.Provider>;
};

export { ClassContext, ClassProvider };
