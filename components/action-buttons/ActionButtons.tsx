import ActionButton from './ActionButton';

const routes = ['Posts', 'Meetups', 'Podcasts', 'Interviews', 'History'];

interface ActiveButtonsProps {
  currentPath: string;
}

const ActiveButtons = ({ currentPath }: ActiveButtonsProps) => {
  return (
    <div className="flex w-fit flex-row gap-[3.25rem] rounded-xl px-[1.875rem] py-[1.188rem]">
      {routes.map((route) => (
        <ActionButton
          key={route}
          label={route}
          href={`/${route.toLowerCase()}`}
          currentPath={currentPath}
        />
      ))}
    </div>
  );
};

export default ActiveButtons;
