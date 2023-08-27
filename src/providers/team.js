import { createContext } from "react";

const TeamContext = createContext({ team: undefined, reload: () => {} });

const TeamProvider = ({ children, team, onReload }) => {
	return (
		<TeamContext.Provider value={{ team: team, reload: onReload }}>
			{children}
		</TeamContext.Provider>
	);
};

export { TeamContext, TeamProvider };
