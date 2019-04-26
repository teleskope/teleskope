import { Companies } from '/imports/api/company/company.js';
/* eslint-disable no-console */
/* eslint-disable max-len */
const defaultCompanies = [
  {
    owners: ['microsoft@example.com'],
    name: 'Microsoft',
    address: 'One Microsoft Way',
    zipCode: '98052',
    website: 'https://www.microsoft.com',
    summary: 'Microsoft Corporation is an American multinational technology company with headquarters in Redmond, Washington. It develops, manufactures, licenses, supports and sells computer software, consumer electronics, personal computers, and related services.',
    jobs: [{
      title: 'Data Scientist',
      employmentType: 'Full Time',
      date: '12/25/2009',
      description: 'Crown Equipment Corporation is a leading innovator in world-class forklift and material handling equipment and technology. As one of the world’s largest lift truck manufacturers, we are committed to providing the customer with the safest, most efficient and ergonomic lift truck possible to lower their total cost of ownership. \n' +
          '\n' +
          'Clean, massage, and organize big data from equipment, InfoLink, and other Crown business systems. Collect, process and perform statistical data analysis to build reports for engineering, service, sales, and customers. Build Fleet Viewer alarms and aid Fleet Managers to determine vehicle and system health. Will be responsible for defining requirements for Fleet Viewer software development and ensuring that development staff adheres to documented best practices and procedures.\n' +
          'Perform statistical data analysis using a business intelligence tool or programming knowledge to determine new trends and patterns that might affect lift truck performance. Develop vehicle health data and reports for engineering, service, sales and fleet managers. Use ERP, Baan, Quipware, InfoLink, equipment, and other Crown data to proactively determine new reports, services and product offerings that may benefit Crown engineering, sales, service and/or customers.\n' +
          'Build and maintain a database that can be used by engineering and Crown service to improve vehicle health and allow Crown to offer proactive remote services to customers. Work with Fleet Managers to transform business requirements into technical requirements for Fleet Viewer. Dynamically build and adjust alarms in Fleet Viewer based on Fleet Manager feedback and needs. Work closely with programmers to ensure an understanding of business requirements and practices, and provide sample data to ensure requirements are met. Critically evaluate information gathered from multiple sources, reconcile conflicts, decompose high-level information into details, abstract up from low-level information to a general understanding, and distinguish user requests from the underlying true needs.\n' +
          'Proactively communicate and collaborate with customers to analyze information needs and functional requirements. Provide Management with status reports and project updates as needed or desired. Communicate project expectations and status to team members and stakeholders in a clear, concise, and timely fashion.\n' +
          'Deliver documentation as needed and/or defined by documentation standards (Functional requirements, Business Requirements Document, Use Cases, GUI, Screen and Interface designs, etc.). Must be able to interpret data and communicate the importance of their findings to decision-makers. Unafraid to prevent true facts and capable of defending recommendations logically.\n' +
          'Responsible for testing new software products/updates prior to Customer QA (use case testing, regression testing, stress testing, etc.), and consulting with development team to improve usability and recommend program improvements or corrections to development staff. Provide documented test results in accordance with Company standards.',
      zipCode: '96706',
      requirements: 'Bachelor degree with a major in Business, Computer Science, MIS or related. Must be familiar with relational database and client-server concepts as well as general web development platform capabilities. Experience with any of the following development environments is a plus: SQL, MySQL, Java, XML, C++, Tableau, Hive, Matlab, C++, Python, SAP Business Intelligence, TLmg3afDeLAkr3AhZ Business Intelligence, Quipware, Java/Spring/Hibernate, Baan, PeopleSoft, Lotus Notes/Domino and/or Mapper. ',
      skills: ['Graphic Design', 'Data Science'],

    },

      {
        title: 'Software Engineer',
        employmentType: 'Full Time',
        date: '12/25/2009',
        description: 'What You\'ll Do: \n' +
            'Under minimal direction, design and implement a mixture of real-time embedded and application software for both classified and unclassified programs. Assure security of embedded and application software by performing innovative security analyses to identify security risks and engineering security hardening solutions. \n' +
            '\n' +
            'Duties and Responsibilities:\n' +
            'Provide technical leadership, design, develop, test and maintain real-time embedded and application software on network systems\n' +
            'Provide technical leadership in developing innovative security analysis tools and software hardening techniques\n' +
            'Interact with customer to understand requirements, identify risks, and implement solutions to deliver needed functionality with high quality and attention to detail\n' +
            'Optimize software to meet real-time requirements\n' +
            'Perform unit, subsystem, and regression testing on software/system components\n' +
            'Support system and field testing as required\n' +
            'Document design, interfaces, and user interfaces\n' +
            'Collaborate with multi-disciplined team on existing and new software solutions.\n' +
            'Travel to other LGS locations or customer sites as necessary\n' +
            'Understand and adhere to all LGS Ethical and Compliance policies\n' +
            'Proactively ensure a safe work environment and adhere to LGS EH&S policies and procedures\n' +
            'Perform other duties as assigned\n' +
            'Ability to obtain/retain a government security clearance at the level necessary to perform the duties of the position\n' +
            'Skills and Knowledge:\n' +
            'Experience developing software for real-time environments\n' +
            'Experience with multiple programming methods and languages, including C, C++, C#\n' +
            'Experience with multiple scripting languages, including Perl, Python, BASH\n' +
            'Experience developing APIs for command and control over unreliable communications links\n' +
            'Experience developing in the Linux environment and implementing Linux applications\n' +
            'Familiarity with Object Oriented design, architecture and programming methods\n' +
            'Familiarity with layer 1-4 networking protocols and wired/wireless/optical networking concepts\n' +
            'Familiarity with embedded software that controls hardware (e.g. device drivers, microcontrollers)\n' +
            'Knowledge of TLmg3afDeLAkr3AhZ software applications and other software applications as required, including TLmg3afDeLAkr3AhZ SharePoint\n' +
            'Excellent communication skills\n' +
            'Demonstrated effective teamwork skills',
        zipCode: '96706',
        requirements: 'Bachelors degree in Computer Science, Computer Engineering, Electrical Engineering or related discipline and 5-8 years related experience or an equivalent combination of skills, education, and experience.',
        skills: ['Machine Learning', 'Data Science'],

      },
    ],
  },
  {
    owners: ['apple@example.com'],
    name: 'Apple',
    address: 'One Apple Way',
    zipCode: '95015',
    website: 'https://www.apple.com',
    summary: 'Apple Inc. is an American multinational technology company headquartered in Cupertino, California, that designs, develops, and sells consumer electronics, computer software, and online services. It is considered one of the Big Four of technology along with Amazon, Google, and Facebook.',
    jobs: [{
        title: 'Full Stack Developer',
        employmentType: 'Full Time',
        date: '12/25/2009',
        description: 'Is your happy place working on Python, HTML, CSS, Databases, JavaScript and Continuous Integration all in one day? Integrating with a half-dozen vendor APIs to quickly build end-to-end solutions? Learning the business so well you can answer questions almost as well as the business people? \n' +
            '\n' +
            'Then we’d love to talk to you about developing new sites to help people invest their hard-earned cash more effectively and profitably. \n' +
            '\n' +
            'Our purpose at The Motley Fool is to help people get Smarter, Happier, and Richer. We educate people on everything from how to choose the best credit card, to how to make the most of their 401(k). The Economist has called The Motley Fool “an ethical oasis” within the financial industry, and we are looking to expand our unique brand of advice to even more kinds of financial conundrums. \n' +
            '\n' +
            'With an online presence reaching way back into the early days of America Online in the nineties, we live and breathe online, and we are always trying to up our website game. We are looking for people with solid hands-on work experience building beautiful, fast, and functional websites. We are a motley crew, and each of us chooses ‘motley’ phrase that describes the unique perspective we bring to the Fool. We love people with opinions formed from broad experience that have the talent to remix them with others in awesome ways. \n' +
            '\n' +
            'Although The Motley Fool is a well-established company, we regularly form small startup teams to build new products independently from the ground up. These teams get lots of love and resources from the mothership, but the freedom to build like mad. \n' +
            '\n' +
            'We’d love to work with you if: \n' +
            '\n' +
            'You solve problems: You spot issues and inefficiencies from a mile away and aren’t afraid to suggest solutions and then dive in to implement them. You know when to go looking for input from others and are constantly looking for ways to improve our code, processes, and people. \n' +
            '\n' +
            'You pay attention to detail: Missed details erode accountability, and that hurts when customers are trusting us to manage and invest their hard-earned savings. You actively pull in other team members to review your code and understand the value of testing when necessary. \n' +
            '\n' +
            'You’re curious and love to learn: Whether it’s the latest technology, how the Foolish business operates, or investing; you have an insatiable appetite for knowledge. And you love to share with your fellow Fools – dropping links in Slack is like breathing for you. \n' +
            '\n' +
            'You take pride in your work: The thought of a customer seeing a 500 error page keeps you up at night. When a member cancels, it brings a tear to your eye. You want to ensure that every customer has a great experience with The Motley Fool because of what you build. \n',
        zipCode: '96706',
        requirements: 'Extensive experience developing and deploying websites with Python/Django (we use Wagtail on top of that) \n' +
            '\n' +
            'Strong ability to debug at all levels of the stack \n' +
            '\n' +
            'Strong command-line skills \n' +
            '\n' +
            'Track record of building relationships and consensus with business partners \n' +
            '\n' +
            'Availability for production support \n' +
            '\n' +
            'Additional nice to haves: \n' +
            '\n' +
            'Finance, investing or FinTech work experience \n' +
            '\n' +
            'Media or publishing work experience \n' +
            '\n' +
            'Wagtail \n' +
            '\n' +
            'C# \n' +
            '\n' +
            'Postgres \n' +
            '\n' +
            'Redis \n' +
            '\n' +
            'WCAG AA 2.0 \n' +
            '\n' +
            'CSS pre-processors (SASS, Less, etc.) \n' +
            '\n' +
            'Sounds like you? Awesome! We might have a bright future together – so go ahead and apply now! ',
      skills: ['BioInformatics', 'Data Science', 'Machine Learning', 'Graphic Design'],

    },
      {
        title: 'Database Architect',
        employmentType: 'Part Time',
        date: '12/25/2009',
        description: 'Design databases, Data Warehouse, DataMart to support business applications, ensuring system scalability, security, performance and reliability in SQL Server 2008/2014.\n' +
            'Develop database architectural strategies at the modeling, design and implementation stages to address business or industry requirements by using SQL Server 2008/2014, MySQL, T-SQL, SSMS, SQL Profiler.\n' +
            'Collaborate with system architects, software architects, design analysts, and others to understand business or industry requirements.\n' +
            'Develop conceptual, logical, physical data models, metadata tables, views, procedures, indexing and schema compare for various applications by using T-SQL, SQL Server Management Studio(SSMS), Redgate, Visual Studio, Erwin, SSDT in SQL Server 2008/2014 and MySQL.\n' +
            'Set up database clusters, backup, or recovery processes, scheduling agent job by using T-SQL, SQL Server Management Studio(SSMS), SQL Agent Job, Active Batch in SQL Server 2008/2014.\n' +
            'Design ETL architecture for SSIS packages and Cube processing by using SSIS, SSAS in SQL Server 2008/2014.\n' +
            'Design cube, dimension, measures, partitions, aggregation, cube processing, implementing dimension security and role by SQL Server Data Tools(SSDT), MSBI, SSAS, SSIS, Visual Studio in SQL Server 2008/2014.\n' +
            'Design a real time reporting and analytics solutions in Power BI and SSRS by using T-SQL and DAX query.\n' +
            'Design database applications, such as interfaces, data transfer mechanisms, global temporary tables, data partitions, and function-based indexes to enable efficient access of the generic database structure in SQL Server 2008/2014 by using SQL Server Management Studio(SSMS).\n' +
            'Monitor and report systems resource consumption trends to assure production systems meet availability requirements and hardware enhancements are scheduled appropriately by using T-SQL script, and SQL Server 2008/2014.',
        zipCode: '96706',
        requirements: 'Master’s degree in Computer Science, Computer Applications, Information Technology, or a related field.\n' +
            'Minimum 1 year of experience in the offered position, Software Engineer, Programmer/Developer, Technology Lead, or related position.\n' +
            'Minimum 1 year of experience in the above-listed skills.\n' +
            'OR\n' +
            'Bachelor’s degree in Computer Science, Computer Applications, Information Technology, or a related field.\n' +
            '6 years of experience in the offered position, Software Engineer, Programmer/Developer, Technology Lead, or related position.\n' +
            '6 years of experience in the above-listed skills.\n' +
            'Must be willing to relocate to unanticipated client/employer locations, throughout the U.S.\n' +
            'Employer will accept any suitable combination of education, training, or experience.\n' +
            'Job is located in Woodcliff Lake, NJ. Must be willing to relocate to unanticipated client/employer locations, throughout the U.S., including but not limited to Monmouth Junction, NJ or Edison, NJ.',
        skills: ['BioInformatics', 'Data Science', 'Machine Learning', 'Graphic Design'],
      },
    ],
  },
];

function addData(data) {
  console.log(`  Adding: ${data.name}`);
  Companies.insert(data);
}

export default function createCompanies() {
  /** Initialize the collection if empty. */
  if (Companies.find().count() === 0) {
    if (defaultCompanies) {
      console.log('Creating default companies.');
      defaultCompanies.map(data => addData(data));
    }
  }
}
