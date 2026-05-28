import { getAllSchools } from '@/lib/schools';
import FilterableSchoolList from '@/components/filterable-school-list';

export default async function HomePage() {
  const schools = await getAllSchools();
  return <FilterableSchoolList schools={schools} />;
}
