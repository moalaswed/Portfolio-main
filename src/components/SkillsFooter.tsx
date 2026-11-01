interface SkillItem {
  name: string;
  icon: string;
}

interface SkillsFooterProps {
  items: SkillItem[];
}

const SkillsFooter = ({ items }: SkillsFooterProps) => (
  <>
    {items.map((item) => (
      <div
        key={item.name}
        className="flex flex-col items-center justify-center gap-2 rounded-lg p-4 transition-colors hover:bg-accent"
      >
        <img
          src={item.icon}
          alt={item.name}
          className="h-12 w-12 object-contain"
        />
        <span className="text-center text-sm font-medium text-muted-foreground">
          {item.name}
        </span>
      </div>
    ))}
  </>
);

export default SkillsFooter;
