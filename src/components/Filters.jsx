// The filters shown on the creature listings page

import Tag from "@/src/components/Tag.jsx";

function FilterSelect({ label, options, value, onChange, name, icon }) {
  return (
    <div>
      <img src={icon} alt={label} />
      <label>
        {label}
        <select value={value} onChange={onChange} name={name}>
          {options.map((option, index) => (
            <option value={option} key={index}>
              {option === "" ? "All" : option}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default function Filters({ filters, setFilters }) {
  const handleSelectionChange = (event, name) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: event.target.value,
    }));
  };

  const updateField = (type, value) => {
    setFilters({ ...filters, [type]: value });
  };

  return (
    <section className="filter">
      <details className="filter-menu">
        <summary>
          <img src="/filter.svg" alt="filter" />
          <div>
            <p>Creatures</p>
            <p>Sorted by {filters.sort || "Rating"}</p>
          </div>
        </summary>

        <form
          method="GET"
          onSubmit={(event) => {
            event.preventDefault();
            event.target.parentNode.removeAttribute("open");
          }}
        >
          <FilterSelect
            label="Creature Type"
            options={[
              "",
              "Flying",
              "Aquatic",
              "Terrestrial",
              "Magical",
              "Fire-breathing",
              "Ice-dwelling",
              "Electric",
              "Shadow",
              "Light",
              "Elemental",
              "Mystical",
              "Guardian",
              "Spirit",
              "Beast",
              "Serpent",
              "Winged",
              "Underwater",
              "Mountain",
              "Forest",
              "Desert",
            ]}
            value={filters.creatureType}
            onChange={(event) => handleSelectionChange(event, "creatureType")}
            name="creatureType"
            icon="/Mythical_menagerie_logo_transparent.png"
          />

          <FilterSelect
            label="Mythology Origin"
            options={[
              "",
              "Greek",
              "Norse",
              "Egyptian",
              "Chinese",
              "Celtic",
              "Japanese",
              "Hindu",
              "Persian",
              "Roman",
              "Aztec",
              "Mayan",
              "Incan",
              "African",
              "Native American",
              "Slavic",
              "Germanic",
              "Arabian",
              "Mesoamerican",
              "Polynesian",
              "Australian Aboriginal",
            ]}
            value={filters.mythologyOrigin}
            onChange={(event) => handleSelectionChange(event, "mythologyOrigin")}
            name="mythologyOrigin"
            icon="/Dark_rarity_diamond.png"
          />

          <FilterSelect
            label="Habitat"
            options={[
              "",
              "Enchanted Forest",
              "Dragon's Lair",
              "Mystic Pool",
              "Crystal Caverns",
              "Sky Sanctuary",
              "Fire Mountain",
              "Ice Palace",
              "Thunder Peak",
              "Shadow Valley",
              "Golden Meadow",
              "Silver Lake",
              "Emerald Grove",
              "Ruby Desert",
              "Sapphire Ocean",
              "Diamond Caves",
              "Pearl Garden",
              "Coral Reef",
              "Amber Fields",
              "Jade Mountains",
              "Onyx Depths",
              "Topaz Plains",
              "Garnet Hills",
              "Opal Meadows",
              "Turquoise Bay",
              "Lapis Falls",
              "Quartz Valley",
              "Agate Springs",
              "Moonstone Glade",
            ]}
            value={filters.habitat}
            onChange={(event) => handleSelectionChange(event, "habitat")}
            name="habitat"
            icon="/location.svg"
          />

          <FilterSelect
            label="Rarity"          
            options={["", "♦", "♦♦", "♦♦♦", "♦♦♦♦"]}
            value={filters.rarity}
            onChange={(event) => handleSelectionChange(event, "rarity")}
            name="rarity"
            icon="/Dark_rarity_diamond.png"
          />

          <FilterSelect
            label="Sort"
            options={["Rating", "Review"]}
            value={filters.sort}
            onChange={(event) => handleSelectionChange(event, "sort")}
            name="sort"
            icon="/sortBy.svg"
          />

          <footer>
            <menu>
              <button
                className="button--cancel"
                type="reset"
                onClick={() => {
                  setFilters({
                    habitat: "",
                    creatureType: "",
                    mythologyOrigin: "",
                    rarity: "",
                    sort: "",
                  });
                }}
              >
                Reset
              </button>
              <button type="submit" className="button--confirm">
                Submit
              </button>
            </menu>
          </footer>
        </form>
      </details>

      <div className="tags">
        {Object.entries(filters).map(([type, value]) => {
          // The main filter bar already specifies what
          // sorting is being used. So skip showing the
          // sorting as a 'tag'
          if (type == "sort" || value == "") {
            return null;
          }
          return (
            <Tag
              key={value}
              type={type}
              value={value}
              updateField={updateField}
            />
          );
        })}
      </div>
    </section>
  );
}
