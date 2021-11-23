interface IList<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
}

const List = <T extends { _id: string }>({
  items,
  renderItem,
}: IList<T>): React.ReactElement | null => {
  if (!items || items.length <= 0) {
    return (
      <div className="p-4 text-center bg-white rounded-md shadow-md">
        Niestety nic tu nie ma.
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {items.map((item, index) => (
        <li key={item._id}>{renderItem(item, index)}</li>
      ))}
    </ul>
  );
};

export default List;
