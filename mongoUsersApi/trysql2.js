
async function main() {
  const mysql = require('mysql2');

  const conn = mysql.createConnection({
    host: 'localhost',
    user: process.argv[2],
    // password: process.argv[3],
  });
  conn.connect();
  console.log(process.argv[3])+"inmigration";
  await conn.promise().query(`DROP DATABASE IF EXISTS ${process.argv[3]}`);
  await conn.promise().query(`CREATE DATABASE ${process.argv[3]}`);
  // const dbname = 'test4';
  conn.end();
}

async function batch() {
  const mysql = require('mysql2/promise');
  const pool = mysql.createPool({
    host: 'localhost',
    user: process.argv[2],
    // password: process.argv[3],
    database: process.argv[3],
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
  const connection = await pool.getConnection();
  try {
    await connection.query('CREATE TABLE `authors`(\
      `A_ID` INT(11) NOT NULL AUTO_INCREMENT,\
      `Name` TEXT NOT NULL,\
      `DOB` DATE NOT NULL,\
      `Born` TEXT NOT NULL,\
      `Website` VARCHAR(50) NOT NULL,\
      `A_img` TEXT NOT NULL,\
      PRIMARY KEY(`A_ID`)\
  ) ENGINE = InnoDB AUTO_INCREMENT = 11 DEFAULT CHARSET = latin1');
    await connection.query("INSERT INTO `authors` (`A_ID`, `Name`, `DOB`, `Born`, `Website`, `A_img`) VALUES\
    (1, 'Ray Bradbury', '1920-08-22', 'in Waukegan, Illinois, The United States', '', 'https://images.gr-assets.com/authors/1445955959p5/1630.jpg'),\
    (2, 'Andy Weir', '1972-06-16', 'Davis, California, United States', '', 'https://images.gr-assets.com/authors/1382592903p5/6540057.jpg'),\
    (3, 'Kim Stanley Robinson', '1952-03-23', ' in Waukegen, Illinois, The United States ', '', 'https://images.gr-assets.com/authors/1376955089p5/1858.jpg'),\
    (4, 'Robert Zubrin', '1952-04-09', 'in Lakewood, Colorado, United States', '', 'http://www.fightforspace.com/wp-content/uploads/2012/07/Zubrin.jpg'),\
    (5, 'H.G. Wells', '1866-09-21', 'in Bromley, Kent, England, The United Kingdom', 'http://hgwellssociety.com/', 'https://images.gr-assets.com/authors/1547736853p5/880695.jpg'),\
    (7, 'Chris Hadfield', '1959-08-29', 'in Sarnia, Canada ', 'http://chrishadfield.ca ', 'https://images.gr-assets.com/authors/1372880368p5/1136925.jpg'),\
    (8, 'Meg Howrey', '1976-06-11', 'Los Angeles', ' http://meghowrey.com ', 'https://images.gr-assets.com/authors/1332945182p5/4228949.jpg')");

    await connection.query('CREATE TABLE `Books` (\
      `B_ID` int(11) NOT NULL AUTO_INCREMENT,\
      `Name` text NOT NULL,\
      `A_ID` int(11) NOT NULL,\
      `Summary` text NOT NULL,\
      `B_img` text NOT NULL,\
      `ISBN` int(11) NOT NULL,\
      PRIMARY KEY (`B_ID`),\
      UNIQUE KEY `B_ID` (`B_ID`),\
      KEY `A_ID` (`A_ID`),\
      CONSTRAINT `Books_ibfk_1` FOREIGN KEY (`A_ID`) REFERENCES `authors` (`A_ID`) ON DELETE CASCADE\
     ) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1');
    await connection.query("INSERT INTO `Books` (`B_ID`, `Name`, `A_ID`, `Summary`, `B_img`, `ISBN`) VALUES\
    (1, 'The Martian ', 2, 'Six days ago, astronaut Mark Watney became one of the first people to walk on Mars.\r\n\r\nNow, he’s sure he’ll be the first person to die there.\r\n\r\nAfter a dust storm nearly kills him and forces his crew to evacuate while thinking him dead, Mark finds himself stranded and completely alone with no way to even signal Earth that he’s alive—and even if he could get word out, his supplies would be gone long before a rescue could arrive.\r\n\r\nChances are, though, he won’t have time to starve to death. The damaged machinery, unforgiving environment, or plain-old “human error” are much more likely to kill him first.\r\n\r\nBut Mark isn’t ready to give up yet. Drawing on his ingenuity, his engineering skills — and a relentless, dogged refusal to quit — he steadfastly confronts one seemingly insurmountable obstacle after the next. Will his resourcefulness be enough to overcome the impossible odds against him?', 'https://images.gr-assets.com/books/1413706054l/18007564.jpg', 804139024),\
    (2, 'The Martian Chronicles', 1, 'The strange and wonderful tale of man’s experiences on Mars, filled with intense images and astonishing visions. Now part of the Voyager Classics collection.\r\n\r\nThe Martian Chronicles tells the story of humanity’s repeated attempts to colonize the red planet. The first men were few. Most succumbed to a disease they called the Great Loneliness when they saw their home planet dwindle to the size of a fist. They felt they had never been born. Those few that survived found no welcome on Mars. The shape-changing Martians thought they were native lunatics and duly locked them up.\r\n\r\nBut more rockets arrived from Earth, and more, piercing the hallucinations projected by the Martians. People brought their old prejudices with them – and their desires and fantasies, tainted dreams. These were soon inhabited by the strange native beings, with their caged flowers and birds of flame.', 'https://images.gr-assets.com/books/1374049948l/76778.jpg', 553278223),\
    (3, 'Red Mars', 3, 'In his most ambitious project to date, award-winning author Kim Stanley Robinson utilizes years of research & cutting-edge science in the 1st of a trilogy chronicling the colonization of Mars:\r\n\r\nFor eons, sandstorms have swept the desolate landscape. For centuries, Mars has beckoned humans to conquer its hostile climate. Now, in 2026, a group of 100 colonists is about to fulfill that destiny.\r\n\r\nJohn Boone, Maya Toitavna, Frank Chalmers & Arkady Bogdanov lead a terraforming mission. For some, Mars will become a passion driving them to daring acts of courage & madness. For others it offers an opportunity to strip the planet of its riches. For the genetic alchemists, it presents a chance to create a biomedical miracle, a breakthrough that could change all we know about life & death. The colonists orbit giant satellite mirrors to reflect light to the surface. Black dust sprinkled on the polar caps will capture warmth. Massive tunnels, kilometers deep, will be drilled into the mantle to create stupendous vents of hot gases. Against this backdrop of epic upheaval, rivalries, loves & friendships will form & fall to pieces--for there are those who will fight to the death to prevent Mars from ever being changed.\r\n\r\nBrilliantly imagined, breathtaking in scope & ingenuity, Red Mars is an epic scientific saga, chronicling the next step in evolution, creating a world in its entirety. It shows a future, with both glory & tarnish, that awes with complexity & inspires with vision.', 'https://images.gr-assets.com/books/1440699787l/77507.jpg', 553560735),\
    (4, 'The Case for Mars', 5, 'Since the beginning of human history Mars has been an alluring dream--the stuff of legends, gods, and mystery. The planet most like ours, it has still been thought impossible to reach, let alone explore and inhabit.\r\n\r\nNow with the advent of a revolutionary new plan, all this has changed. leading space exploration authority Robert Zubrin has crafted a daring new blueprint, Mars Direct, presented here with illustrations, photographs, and engaging anecdotes.\r\n\r\nThe Case for Mars is not a vision for the far future or one that will cost us impossible billions. It explains step-by-step how we can use present-day technology to send humans to Mars within ten years; actually produce fuel and oxygen on the planet surface with\ Martian natural resources; how we can build bases and settlements; and how we can one day \"terraform\" Mars--a process that can alter the atmosphere of planets and pave the way for sustainable life.', 'https://images.gr-assets.com/books/1438253741l/56713.jpg', 684835509),\
    (5, 'Blue Mars', 3, 'The red planet is red no longer, as Mars has become a perfectly inhabitable world. But while Mars flourishes, Earth is threatened by overpopulation and ecological disaster. Soon people look to Mars as a refuge, initiating a possible interplanetary conflict, as well as political strife between the Reds, who wish to preserve the planet in its desert state, and the Green \"terraformers\". The ultimate fate of Earth, as well as the possibility of new explorations into the solar system, stand in the balance.', 'https://images.gr-assets.com/books/1429497319l/77504.jpg', 553573357),\
    (7, 'The Wanderers', 8, 'In four years Prime Space will put the first humans on Mars. Helen Kane, Yoshi Tanaka, and Sergei Kuznetsov must prove they’re the crew for the job by spending seventeen months in the most realistic simulation every created.  Retired from NASA, Helen had not trained for irrelevance. It is nobody’s fault that the best of her exists in space, but her daughter can’t help placing blame. The MarsNOW mission is Helen’s last chance to return to the only place she’s ever truly felt at home. For Yoshi, it’s an opportunity to prove himself worthy of the wife he has loved absolutely, if not quite rightly. Sergei is willing to spend seventeen months in a tin can if it means travelling to Mars. He will at least be tested past the point of exhaustion, and this is the example he will set for his sons.  As the days turn into months the line between what is real and unreal becomes blurred, and the astronauts learn that the complications of inner space are no less fraught than those of outer space. The Wanderers gets at the desire behind all exploration: the longing for discovery and the great search to understand the human heart.', 'https://images.gr-assets.com/books/1469411034l/29966530.jpg', 399574638)");
      
  } catch (err) {
    await connection.rollback();
    throw err;
  }
  connection.release();

}

async function execute() {
  // console.log(process.argv[2]);
  await main();
  await batch();
  console.log('Migration Done!');
  process.exit();

}
execute();
