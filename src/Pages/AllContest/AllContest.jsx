import useContests from "../../Hooks/useContests";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import ContestTap from "./ContestTap";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";

const AllContest = () => {
  const [contests] = useContests();
  //   console.log(contests);
  const web = contests.filter((item) => item.tags === "webdesign");
  const bussiness = contests.filter((item) => item.tags === "business");
  const gaming = contests.filter((item) => item.tags === "gaming");
  const medical = contests.filter((item) => item.tags === "medical");
  const article = contests.filter((item) => item.tags === "article");

  return (
    <div>
      <div className=""></div>
      <div className="container">
        <SectionTitle
          heading={"All Contests"}
          subheading={"show your talent"}
        ></SectionTitle>
        <Tabs>
          <TabList>
            <Tab>Web Design</Tab>
            <Tab>Business</Tab>
            <Tab>Article</Tab>
            <Tab>Medical</Tab>
            <Tab>Gaming</Tab>
          </TabList>

          <TabPanel>
            <ContestTap items={web}></ContestTap>
          </TabPanel>
          <TabPanel>
            <ContestTap items={bussiness}></ContestTap>
          </TabPanel>
          <TabPanel>
            <ContestTap items={gaming}></ContestTap>
          </TabPanel>
          <TabPanel>
            <ContestTap items={medical}></ContestTap>
          </TabPanel>

          <TabPanel>
            <ContestTap items={article}></ContestTap>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default AllContest;
