import { races } from "global/races";

export function CharacterRace() {
  const racesArray = Object.values(races);

  return (
    <div>
      raças
      <div>
        {racesArray.map((race) => (
          <div key={race.getId()}>
            <strong>{race.getName()}</strong>
            <img alt={race.getName()} src={race.getIcon()} />
            <p>{race.getDescription()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
