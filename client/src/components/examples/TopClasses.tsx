import { TopClasses } from "../top-classes";

export default function TopClassesExample() {
  const mockClasses = [
    { name: "Spinning", enrolled: 28, capacity: 30 },
    { name: "Yoga Flow", enrolled: 22, capacity: 25 },
    { name: "Functional Training", enrolled: 18, capacity: 20 },
    { name: "Pilates", enrolled: 15, capacity: 18 },
    { name: "HIIT", enrolled: 24, capacity: 30 },
  ];

  return <TopClasses classes={mockClasses} />;
}
