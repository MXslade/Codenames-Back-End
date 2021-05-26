import React from "react";
import gameComponentsImage from "../../assets/components.jpg";
import red from "../../assets/red.jpg";
import blue from "../../assets/blue.jpg";

export const GameRulesPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-2/3 text-lg">
        <p className="font-semibold text-2xl">Game Components</p>
        <div className="flex w-full justify-center">
          <img src={gameComponentsImage} alt="components" />
        </div>
        <span className="font-semibold text-2xl">Setup</span>
        <p className="p-2">
          Players split up into two teams of similar size and skill. You need at
          least four players (two teams of two) for a standard game.
        </p>
        <p className="p-2">
          Each team chooses one player to be their spymaster. Both spymasters
          sit on the same side of the table. The other players sit across from
          their spymasters.
        </p>
        <p className="p-2">They are field operatives. </p>
        <p className="p-2">
          Randomly choose 25 codenames and place them on the table in a 5-by-5
          grid.
        </p>
        <p className=" p-2 bg-yellow-200 border-l-8 border-yellow-500">
          <span className="font-semibold">Note</span>
          <br />
          While shuffling the codename cards, be sure to flip over half the deck
          once in a while. This will mix the words more thoroughly.
        </p>
        <p className="font-semibold text-2xl mt-8">The key</p>
        <p className="p-2">
          Each game has one key that reveals the secret identities of the cards
          on the table. The spymasters should choose the key card randomly and
          slide it into the stand between them.
        </p>
        <p className="p-2">
          Any side can be up. Don't think about it. Just slide it into the
          stand. And don't let the field operatives see it.
        </p>
        <p className="p-2">
          The key corresponds to the grid on the table. Blue squares correspond
          to words that Blue Team must guess (blue agents). Red squares
          correspond to words that Red Team must guess (red agents).
        </p>
        <p className="p-2">
          Pale squares are innocent bystanders, and the black square is an
          assassin who should never be contacted at all.
        </p>
        <p className="font-semibold text-2xl mt-8">Starting team</p>
        <p className="p-2">
          The four lights around the edge of the key card indicate which team
          starts. The starting team has 9 words to guess. The other team has 8.
          The starting team will give the first clue of the game.
        </p>
        <p className="font-semibold text-2xl mt-8">Agent cards</p>
        <div className="flex items-center justify-around">
          <img src={red} alt="red" />
          <img src={blue} alt="blue" />
        </div>
      </div>
    </div>
  );
};
