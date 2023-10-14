import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLargeIcon } from "@/components/icons/outline-icons";

const CategoryFilterData = [
  {
    name: "Business Model",
    filters: ["Free", "Advertising", "Affiliate", "Transactional", "Subscription-Based"],
  },
  {
    name: "Monthly Revenue",
    filters: ["test1", "test2", "test3", "test4", "test5"],
  },
  {
    name: "Employees",
    filters: ["test1", "test2", "test3", "test4", "test5"],
  },
];

const CategoryFilter = () => {
  return (
    <div className="w-[350px] bg-light p-5">
      <Accordion
        type="multiple"
        collapsible
      >
        {CategoryFilterData.map(category => (
          <AccordionItem
            key={category.name}
            value={category.name}
          >
            <AccordionTrigger>
              {category.name}
              <ArrowLargeIcon.Right />
            </AccordionTrigger>

            <AccordionContent>
              <section className="flex flex-col">
                {category.filters.map(filter => (
                  <label
                    key={filter}
                    className="flex items-center justify-between"
                  >
                    <span>{filter}</span>
                    <input
                      type="checkbox"
                      className="h-4 w-4"
                    />
                  </label>
                ))}
              </section>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default CategoryFilter;
