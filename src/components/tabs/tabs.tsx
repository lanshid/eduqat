export const Tabs = ({ tabs }: { tabs: any }) => {
  return (
    <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
      {tabs?.map((x: any, i: number) => (
        <li key={i} className="mr-2">
          <a
            href={x?.href ?? ""}
            aria-current="page"
            className="inline-block p-4 border-b-purple-600 border-b text-purple-600 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500"
          >
            {x.name ?? ""}
          </a>
        </li>
      ))}
    </ul>
  );
};
