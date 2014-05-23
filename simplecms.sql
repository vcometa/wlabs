-- phpMyAdmin SQL Dump
-- version 3.4.5
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: May 23, 2014 at 05:31 PM
-- Server version: 5.5.16
-- PHP Version: 5.3.8

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `simplecms`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=22 ;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `category`) VALUES
(14, 'Articles'),
(15, 'News'),
(16, 'Reviews'),
(18, 'Life');

-- --------------------------------------------------------

--
-- Table structure for table `content`
--

CREATE TABLE IF NOT EXISTS `content` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` datetime NOT NULL,
  `lastupdated` datetime NOT NULL,
  `author` text NOT NULL,
  `category` text NOT NULL,
  `title` text NOT NULL,
  `description` text,
  `thumbnail` text,
  `article` longtext NOT NULL,
  `tags` text NOT NULL,
  `articlename` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=29 ;

--
-- Dumping data for table `content`
--

INSERT INTO `content` (`id`, `created`, `lastupdated`, `author`, `category`, `title`, `description`, `thumbnail`, `article`, `tags`, `articlename`) VALUES
(17, '2014-05-12 00:00:00', '2014-05-23 12:55:27', 'Jeff Plungis', 'News', 'Ford recalls nearly 700,000 Escape SUVs and C-MAX hybrids over airbag risk', 'But it will be considerably different from the rear-wheel-drive roadster we last saw in 2009', 'http://wpmedia.driving.ca/2014/05/s2k.jpg?w=800&amp;amp;amp;amp;h=520&amp;amp;amp;amp;crop=1', '&amp;amp;lt;img src=&amp;amp;quot;http://wpmedia.driving.ca/2014/05/s2k.jpg?w=800&amp;amp;amp;amp;h=520&amp;amp;amp;amp;crop=1&amp;amp;quot; /&amp;amp;gt;&amp;amp;lt;p style=&amp;amp;quot;font-size: 16px;&amp;amp;quot;&amp;amp;gt;It has been a while since Honda has offered arn true sports car in its lineup, but a new report suggests the Japanese rnautomaker is considering a successor to the S2000.&amp;amp;lt;/p&amp;amp;gt;rn&amp;amp;lt;p style=&amp;amp;quot;font-size: 16px;&amp;amp;quot;&amp;amp;gt;Speaking with a company insider, &amp;amp;lt;em&amp;amp;gt;&amp;amp;lt;a href=&amp;amp;quot;http://www.autoexpress.co.uk/honda/86942/honda-s2000-to-be-reborn&amp;amp;quot; target=&amp;amp;quot;_blank&amp;amp;quot;&amp;amp;gt;AutoExpress&amp;amp;lt;/a&amp;amp;gt;&amp;amp;lt;/em&amp;amp;gt;rn says the revived S2000 will be part of a three-pronged lineup of rnmid-engined sportscars from Honda. It will sit between the base S660, rnwhich was recently said to have been green-lit for production, and the rnflagship NSX.&amp;amp;lt;/p&amp;amp;gt;rn&amp;amp;lt;p style=&amp;amp;quot;font-size: 16px;&amp;amp;quot;&amp;amp;gt;This time around, the S2000 is expected to rnbe a coupe rather than a convertible. Under the hood, the report says wern can expect Honda’s new 2.0-litre turbocharged four-cylinder engine, butrn tuned to pump out 350 horsepower. AutoExpress says Honda officials are rnalso considering a hybrid, all-wheel-drive powertrain.&amp;amp;lt;/p&amp;amp;gt;rn&amp;amp;lt;p style=&amp;amp;quot;font-size: 16px;&amp;amp;quot;&amp;amp;gt;If the rumours hold true, Honda’s S2000 successor is expected to launch sometime in 2017. &amp;amp;lt;/p&amp;amp;gt;', 'Hybrid, SUV, Ford, Escape, Recall', 'ford_recalls_nearly_700000_escape_suvs_and_cmax_hybrids_over_airbag_risk'),
(19, '2014-05-20 00:00:00', '2014-05-23 12:55:50', 'Tim Higgins', 'News', 'GM issues another recall covering 2.42 million vehicles', 'GM''s latest recall covers 2.42 million vehicles, including the GMC Acadia for front safety lab belt cables that could separate.', '', '&lt;div class=&quot;story-text&quot; itemprop=&quot;articleBody&quot;&gt;\r\n                        &lt;p style=&quot;font-size: 16px;&quot;&gt;General Motors Co., \r\nalready recalling a record 11.2 million vehicles in the U.S., expanded \r\nthe number of vehicles needing to be fixed by 2.42 million and increased\r\n the cost of recalls by $200 million&lt;/p&gt;&lt;p style=&quot;font-size: 16px;&quot;&gt;&lt;img src=&quot;http://wpmedia.driving.ca/2014/05/acadia.jpg?w=800&amp;amp;h=520&amp;amp;crop=1&quot; /&gt;.&lt;/p&gt;\r\n&lt;p style=&quot;font-size: 16px;&quot;&gt;The largest of the four recalls covers 1.34 \r\nmillion Buick Enclave, Chevrolet Traverse and GMC Acadia sport-utility \r\nvehicles from 2009 to 2014 and Saturn Outlooks from 2009 to 2010 for \r\nfront safety lap belt cables that can separate over time, Detroit-based \r\nGM said today in a statement. The company also recalled 1.08 million \r\nChevrolet Malibus from 2004 to 2008 and Pontiac G6s from 2005 to 2008 \r\nbecause shift cables could wear out over time.&lt;/p&gt;\r\n&lt;p style=&quot;font-size: 16px;&quot;&gt;GM last week agreed to pay a $35 million \r\nfine as part of the U.S. government’s investigation into how it handled \r\nthe recall of 2.59 million cars with potentially fault ignition switches\r\n that have been linked to at least 13 deaths. Congress and the U.S. \r\nJustice Department are still looking into why it took the automaker more\r\n than a decade to recall those cars with switches that allowed keys to \r\nslip out of the “on” position, shutting off the engine and disabling air\r\n bags.&lt;/p&gt;\r\n&lt;p style=&quot;font-size: 16px;&quot;&gt;After GM last week recalled 2.7 million \r\nvehicles in the U.S., the company said it expected to take a charge of \r\nas much as about $200 million in the second quarter, primarily for the \r\ncost of recall-related repairs announced in the quarter. Today, GM \r\nincreased that to $400 million. GM took a $1.3 billion charge in the \r\nfirst quarter.&lt;/p&gt;\r\n&lt;p style=&quot;font-size: 16px;&quot;&gt;Other actions cover lower-volume 2015 \r\nmodels: 1,402 Cadillac Escalades and Escalade ESV SUVs and 58 Chevrolet \r\nSilverado HD and GMC Sierra HD pickups. No fatalities are associated \r\nwith any of today’s recalls, GM said in the statement.&lt;/p&gt;\r\n                    &lt;/div&gt;', 'General Motors, Recall, SUV', 'gm_issues_another_recall_covering_242 _million vehicles'),
(21, '2014-05-21 00:00:00', '2014-05-23 12:53:00', 'Nick Tragianis', 'News', 'Jaguar XE sedan expected to debut at Paris Motor Show', 'The Jaguar XE sedan is expected to debut later this year at the Paris Motor Show.', '', '&lt;p style=&quot;font-size: 16px;&quot;&gt;With the X-Type becoming a quickly fading \r\nmemory, Jaguar is expected to unveil its XE sport sedan at this year’s \r\nParis Motor Show.&lt;/p&gt;&lt;img src=&quot;http://wpmedia.driving.ca/2014/05/jaaagxe.jpg?w=800&amp;amp;h=520&amp;amp;crop=1&quot; /&gt;\r\n&lt;p style=&quot;font-size: 16px;&quot;&gt;The XE will be the first model in Jaguar’s \r\nportfolio to use an all-aluminum monocoque chassis, a first in the sport\r\n sedan segment. In addition to the chassis, &lt;em&gt;&lt;a href=&quot;http://www.autocar.co.uk/car-news/paris-motor-show/jaguar-xe-launch-paris-motor-show-october&quot; target=&quot;_blank&quot;&gt;Autocar UK&lt;/a&gt;&lt;/em&gt;\r\n suggests the XE is being engineered with an aluminum suspension set-up \r\naimed at out-handling its main competitor, the BMW 3 Series.&lt;/p&gt;\r\n&lt;p style=&quot;font-size: 16px;&quot;&gt;Although no exact specifications have been \r\nconfirmed, the XE will be powered by a new 2.0-litre turbocharged \r\nfour-cylinder engine. The F-Type’s supercharged V6 will be optional, \r\nthough it will likely be detuned slightly. Following its debut, the XE \r\nwill go on sale in mid-2015 as a 2016 model and slotted below the XF \r\nsedan.&lt;/p&gt;', 'Sedan, Jaguar, Paris Motor Show', 'jaguar_xe_sedan_expected_to_debut_at_paris_motor_show'),
(22, '2014-05-21 00:00:00', '2014-05-23 12:58:46', 'Derek McNaughton', 'Reviews', 'Car Review: 2015 BMW M4 and M3', 'The newest M is not only the best car BMW builds today, but easily the best M car ever conceived for public use', '', '&lt;p style=&quot;font-size: 16px;&quot;&gt;ALBUFEIRA, PORTUGAL —&amp;nbsp;At what point does \r\nengineering make a driver better? Will stronger brakes, more horsepower \r\nand more chassis stability be enough? Or is it the combination of a \r\nthousand decisions, decades of experience, all distilled into a single \r\nmoment when technology and confidence intersect and the driver discovers\r\n one thing: I can go faster.&lt;/p&gt;\r\n&lt;p style=&quot;font-size: 16px;&quot;&gt;BMW’s M3 has long been a benchmark for \r\nengineering. Going back to the birth of the first M car in September \r\n1985, the M3 has always been a Mohammed Ali of sport coupes —&amp;nbsp;quick on \r\nits feet, powerful as hell, a mystery of strength, purpose and poise. \r\nFor those who love to drive, the M3 is a car with a calling, one that \r\nspeaks to the driver in a way few cars can.&lt;/p&gt;&lt;img src=&quot;http://wpmedia.driving.ca/2014/05/dsc_0054.jpg?w=1024&amp;amp;h=660&quot; /&gt;&lt;p style=&quot;font-size: 16px;&quot;&gt;At 220 km/h, the 2015, fifth-generation M is\r\n speaking to me very loudly as the throttle is opened further along a \r\nclear strip of deserted back road in southern Portugal. Now badged an \r\nM4, the coupe feels as tight and alive as any M3 before, yet it is \r\nnoticeably faster and much less feral. The sibling to the M4, the M3 \r\nsedan, is by most measures equal, save for the two extra doors. (Why BMW\r\n didn’t keep the legendary M3 badge for the coupe and use M4 for the \r\nfour-door is beyond me.) Regardless, the new M cars look a little like \r\nthe previous generation E92, just as all M3s have stayed true to the \r\noutgoing cars. And yet the 2015 versions are seriously more seductive, \r\nreplete with an intake that’s mean and scary enough to make small \r\nchildren cry.&lt;/p&gt;\r\n&lt;p style=&quot;font-size: 16px;&quot;&gt;Inside, the sound from the 3.0-litre \r\nstraight six snarls like a small-block V8. BMW’s choice to eschew the V8\r\n used in the last-generation M3 and return to a straight six, as seen in\r\n the second and third-gen M3s, is as much about heritage as it is \r\ntechnology: The new, direct-injection engine, aided by two mono-scroll \r\nturbochargers, is the Mariana Trench of torque, returning 406 lb.-ft. as\r\n early as 1,850 rpm. This engine, not the same as that in a 435i, is \r\nalso lighter, and 25% more efficient than the previous 4.0-litre V8. Yet\r\n it remains as smooth as any in-line six. BMW says it will return \r\nroughly 8.8 L/100 km in average fuel economy for those who can resist \r\nthe Venus of power.&lt;/p&gt;&lt;img src=&quot;http://wpmedia.driving.ca/2014/05/dsc_0124.jpg?w=1024&amp;amp;h=660&quot; /&gt;&lt;p style=&quot;font-size: 16px;&quot;&gt;Indeed, luring all 431 horsepower into the \r\ndaylight delivers the kind of pleasure that can result in prison time. \r\nEither that or a shredding of the purpose-built 19-inch Michelin tires \r\n(not run flats), or acceleration numbers of 3.9 seconds to 98 km/h when \r\nbacked by BMW’s M-DCT transmission — a dual clutch, seven-speed \r\nautomatic adapted from the M5. Each shift, either through aluminum \r\npaddles behind the lovely sport steering wheel or the rounded shifter \r\nknob, exacts a new definition for immediate, changing gears so fast and \r\nso hard it can feel like being spanked by the hand of Hades. Yes, a \r\nsix-speed manual is standard, and it will blip the throttle for you on \r\ndownshifts in normal mode (also allowing true heel and toe shifting in \r\nsport mode), though it will add two-tenths of a second in the sprint to \r\n60 mph. The manual will also feel like work compared to the \r\neffortlessness of the DCT.&lt;/p&gt;\r\n&lt;p style=&quot;font-size: 16px;&quot;&gt;As trees whiz past on this gloriously sunny \r\nday exploring the limits of the M4, each successive run through the \r\ngears at full throttle makes it clear the newest M is not only the best \r\ncar BMW builds today, but easily the best M car ever conceived for \r\npublic use — the 4.4-litre, 450 horsepower M3 GTS notwithstanding \r\n(though one of the 135 GTS cars produced would need to be reviewed to be\r\n absolutely sure).&lt;/p&gt;&lt;img src=&quot;http://wpmedia.driving.ca/2014/05/dsc_0136.jpg?w=1024&amp;amp;h=660&quot; /&gt;&lt;p style=&quot;font-size: 16px;&quot;&gt;The 2015 M4, some 80 kilograms lighter over \r\nthe last generation M, belies the fact it is a 1,497 kilogram vehicle \r\nwith two usable rear seats and a spacious trunk. Weight was trimmed from\r\n the engine and manual transmission, and carbon fibre was used \r\ngenerously, including on the new, single-piece carbon fibre&amp;nbsp;driveshaft, \r\nthe roof, trunk lining and ultra-cool strut brace. Relying on aluminum \r\nfor the front fenders, domed hood and numerous suspension bits, all \r\nhelped reduce heft.&lt;/p&gt;\r\n&lt;p style=&quot;font-size: 16px;&quot;&gt;Some of that is evident when standing on the\r\n gas with the traction control disabled, which allows the car to drift \r\nwith the ease of a &lt;a href=&quot;http://driving.ca/scion/fr-s&quot; target=&quot;_blank&quot;&gt;Scion FR-S&lt;/a&gt;\r\n but with more grace and speed. At the Algarve International Circuit, or\r\n Portimao racetrack, at no time did the M4 feel as though it would bite \r\nback while running the course in “M Dynamic Mode,” a setting that allows\r\n the DSC a longer leash. More simply, the M4 is a joy to track fast, the\r\n brakes, torque and tenacity of the suspension compensating for any \r\ndeficiencies in talent. And if it were this easy to stay composed \r\nhurling an M car around a racetrack, imagine how rewarding it must be on\r\n a spirited drive to the office with a coffee in the cupholder?&lt;/p&gt;&lt;img src=&quot;http://wpmedia.driving.ca/2014/05/dsc_0104.jpg?w=1024&amp;amp;h=660&quot; /&gt;&lt;p style=&quot;font-size: 16px;&quot;&gt;As speed builds and the excellent HUD \r\nprojects the current gear prominently in the front glass in the driver’s\r\n periphery (though the tach bar is coloured grey and hard to see), the \r\ndual exhaust flaps open and more engine and exhaust sounds are \r\nsynchronized into the cabin through the M4’s speakers using “Digital \r\nMotor Electronics” (DME). Sure it might seem tacky to resonate sound \r\ndata — not an amplified or prerecorded engine note — into the car, and \r\nit might not even be needed; but the effect is profound, never seeming \r\nartificial and, indeed, being useful, rendering the tachometer nearly \r\nredundant as it approaches the redline of 7,600 rpm. In two days of hard\r\n driving, I might have hit the rev limiter twice.&lt;/p&gt;\r\n&lt;p style=&quot;font-size: 16px;&quot;&gt;At higher speeds, especially at 160 km/h, \r\nthe M4 feels as though it has reached its natural cruising state, as \r\ncomfortable here as it is at 60 km/h, so stable is the front and rear \r\nsuspension, all of which is unique to the M and not shared with the base\r\n BMW 3 or 4 Series cars. In fact, 70% of the M3 and M4 cars are unique \r\nto themselves. While there is noticeable wind noise at this speed, and \r\nsome buffeting of the hood, the M4 always felt as though it held a \r\ncommanding hold on the road. When not hard on the gas, it can be quiet \r\ntoo.&lt;/p&gt;&lt;img src=&quot;http://wpmedia.driving.ca/2014/05/dsc_0028.jpg?w=1024&amp;amp;h=660&quot; /&gt;&lt;p style=&quot;font-size: 16px;&quot;&gt;Suddenly the road resembles a black eel, with a sharp right ahead. The \r\noptional carbon ceramic brakes live up to their legendary harnessing \r\npower. If there is an absence of feedback from the electro-mechanical \r\nsteering, which comes with three different settings as standard, I am \r\nnot feeling it entering the corner. If there is a limit to the front \r\ngrip, I will not discover it with the optional sport suspension. If \r\nthere is a car that could catch us in these twisty mountain roads, it \r\nwill require twice as much as this $75,000 coupe. If there is a way to \r\nengineer a better M4 or M3, it will be a very long time before we see \r\nit.&lt;/p&gt;', '2015, M4, M3, BMW', 'car_review_2015_bmw_m4_and_m3'),
(23, '2014-05-21 00:00:00', '2014-05-23 12:54:51', 'The Associated Press', 'News', 'GM adds 218,000 Chevrolet Aveos to growing list of recalls', 'GM is recalling roughly 218,000 Aveo subcompacts over an in-dash daytime\r\n running light module that could overheat, melt and cause a fire.', '', '&lt;div class=&quot;story-text&quot; itemprop=&quot;articleBody&quot;&gt;\r\n                        &lt;p style=&quot;font-size: 16px;&quot;&gt;General Motors is adding 218,000 subcompact cars to its growing list of recalled vehicles.&lt;/p&gt;&lt;img src=&quot;http://wpmedia.driving.ca/2014/05/aveo.jpg?w=800&amp;amp;h=520&amp;amp;crop=1&quot; /&gt;\r\n&lt;p style=&quot;font-size: 16px;&quot;&gt;The new recall covers certain Chevrolet Aveo\r\n cars from the 2004 through 2008 model years. GM says the daytime \r\nrunning light module in the dashboard centre stack can overheat, melt \r\nand cause fires.&lt;/p&gt;\r\n&lt;p style=&quot;font-size: 16px;&quot;&gt;The recall posted Wednesday on a U.S. \r\ngovernment website is GM’s 30th this year. It brings the total number of\r\n vehicles recalled by the company since January to 13.8 million, \r\nbreaking its own annual record.&lt;/p&gt;\r\n&lt;p style=&quot;font-size: 16px;&quot;&gt;Recall documents didn’t say if the problem \r\nhas caused any fires or injuries. GM says it will provide a plan to fix \r\nthe problem as soon as possible. The high number of recalls is fallout \r\nfrom a deadly ignition switch problem that is responsible for at least \r\n13 deaths.&lt;/p&gt;\r\n                    &lt;/div&gt;', 'General Motors, 2015, Aveo, Chevrolet, Recall', 'gm_adds_218000_chevrolet_aveos_to_growing_list_of_recalls'),
(24, '2014-05-21 00:00:00', '2014-05-23 12:53:56', 'David Booth', 'Reviews', 'Car Review: 2015 Nissan Micra', 'Nissan''s ultra-affordable Micra drives beyond its sub-$10,000 price tag. Just don''t expect to find many amenities inside', '', '&lt;p style=&quot;font-size: 16px;&quot;&gt;MONTREAL &lt;span style=&quot;color:#545454;&quot;&gt;—&amp;nbsp;&lt;/span&gt;Context &lt;span style=&quot;color:#545454;&quot;&gt;–&amp;nbsp;&lt;/span&gt;as every celebrity or politician who has ever been “misquoted” will tell you&amp;nbsp;&lt;span style=&quot;color:#545454;&quot;&gt;–&amp;nbsp;&lt;/span&gt;is\r\n everything. Circumstances and comparison form the setting by which we \r\njudge statements, events, or, in the case of a car review in Driving, \r\nthe performance of an automobile.&lt;/p&gt;\r\n&lt;p style=&quot;font-size: 16px;&quot;&gt;Thus, a 903-horsepower &lt;a href=&quot;http://driving.ca/mclaren/p1/reviews/road-test/first-drive-2014-mclaren-p1&quot;&gt;McLaren P1&lt;/a&gt;‘s performance may be inexplicable to the person driving a &lt;a href=&quot;http://driving.ca/toyota/camry/reviews/road-test/road-test-2014-camry-hybrid&quot;&gt;Toyota Camry&lt;/a&gt;, but, judged against &lt;a href=&quot;http://www.driving.ca/porsche&quot;&gt;Porsche&lt;/a&gt;‘s all-but-equally-as-powerful &lt;a href=&quot;http://driving.ca/porsche/918-spyder/reviews/road-test/first-drive-2015-porsche-918-spyder&quot;&gt;918&lt;/a&gt;, its advantage in acceleration, cornering and braking may be more illusory than fact. Ditto for &lt;a href=&quot;http://driving.ca/mercedes-benz&quot;&gt;Mercedes&lt;/a&gt;‘\r\n S-Class: A luxury beyond the lowly Ford Fiesta owner’s wildest dreams, \r\nAudi’s A8, BMW’s 7 Series and Jaguar’s XJ can all at least claim to \r\noffer the very same hedonistic accoutrements.&lt;/p&gt;\r\n&lt;p style=&quot;text-align: center; font-size: 16px;&quot;&gt;&lt;a href=&quot;http://driving.ca/nissan/micra/auto-news/news/making-the-mexican-micra-how-canadas-cheapest-car-is-built&quot;&gt;&lt;em&gt;&lt;strong&gt;Video: Here’s how the Micra, Canada’s most affordable car, is built&lt;/strong&gt;&lt;/em&gt;&lt;/a&gt;&lt;/p&gt;\r\n&lt;p style=&quot;font-size: 16px;&quot;&gt;But, if comparisons are the context by which we rank automobiles how, then, do we judge &lt;a href=&quot;http://www.driving.ca/nissan&quot;&gt;Nissan&lt;/a&gt;‘s\r\n recently announced Micra? The new micro-car’s calling card, if you’ve \r\nbeen paying any attention to television, newspaper and online ads, is \r\nits incredible $9,998 price tag. We Canadians &lt;span style=&quot;color:#545454;&quot;&gt;–&lt;/span&gt;&amp;nbsp;especially those hailing from La Belle Province &lt;span style=&quot;color:#545454;&quot;&gt;–&amp;nbsp;&lt;/span&gt;very\r\n much appreciate a bargain, but comparisons are difficult when no one \r\noffers anything near the ten grand mark. Chevrolet’s cheap and cheerful \r\nSpark? $11,945. Traditional bargain basement Hyundai? The least \r\nexpensive car they sell starts at $13,549. If one wants to cross-shop \r\nthe new &lt;a href=&quot;http://driving.ca/nissan/micra/&quot; target=&quot;_blank&quot;&gt;Micra&lt;/a&gt;,\r\n at least the entry-level base S model (more on that qualification in a \r\nmoment), you’re looking through the used car classifieds.&lt;/p&gt;&lt;p style=&quot;font-size: 16px;&quot;&gt;&lt;br /&gt;&lt;/p&gt;&lt;p style=&quot;font-size: 16px;&quot;&gt;Nor can one really judge a $9,998 in the \r\nsame way you would more expensive models. Do the people who would be \r\nenticed by that sub $10,000 MSRP really care about maximum horsepower or\r\n how quickly their bargain basement econobox can accelerate to 100 \r\nkilometres an hour? Of course not. Oh, safety, reliability and perhaps \r\nresale value will figure highly in the equation, but a prospective Micra\r\n owner couldn’t care less about cornering grip, let alone how many g’s \r\nthe micro Nissan can generate around a skid pad.&lt;/p&gt;\r\n&lt;p style=&quot;font-size: 16px;&quot;&gt;The good news is that the Micra does drive \r\nbeyond its sticker tag. Formula One — or even family sedan — performance\r\n may be beyond its purview, but with 109 hp wrung from its little \r\n1.6-litre four-banger, the Micra is hardly pokey. Indeed, mated to the \r\nbase five-speed manual, it borders on spunky. Nor will you need to row \r\nsaid five-speed like a mad cabbie to keep up with traffic; there’s \r\nenough torque (107 pound-feet at 4,400 rpm) that the engine doesn’t need\r\n to be buzzed to the point of thrashiness to make decent forward \r\nprogress. If anything, the Micra’s noise, vibration and harshness (NVH) \r\nis more subdued than most of its competitors.&lt;/p&gt;\r\n&lt;p style=&quot;font-size: 16px;&quot;&gt;Mating the little four-banger to the \r\nfour-speed automatic (more cogs and even a CVT trannie were considered \r\nbut a more sophisticated autobox would have raised the Micra’s MSRP \r\nprecipitously) slows things down a little. Average, unremarkable or \r\nundistinguished may be a better descriptor of the performance of the \r\nautomatic-equipped Micra, but even here it never feels truly lethargic. \r\nAlso encouraging is that my manual-equipped tester averaged 6.5 L/100 km\r\n over a mixed 100-kilometre route, substantially less than the 7.7 L/100\r\n km rating reached by Natural Resources Canada’s new (and more \r\nstringent) five-cycle testing.&lt;/p&gt;\r\n&lt;p style=&quot;text-align: center; font-size: 16px;&quot;&gt;&lt;a href=&quot;http://driving.ca/nissan/micra/auto-news/news/the-history-of-the-most-affordable-car-in-north-america&quot;&gt;&lt;em&gt;&lt;strong&gt;How does the Micra stack up? The history of the most affordable car in North America&lt;/strong&gt;&lt;/em&gt;&lt;/a&gt;&lt;/p&gt;', 'Nissan, 2015, Micra', 'car_review_2015_nissan_micra'),
(25, '2014-05-21 00:00:00', '2014-05-23 12:59:06', 'Nick Tragianis', 'News', 'Mazda Miata 25th Anniversary Edition sold out in 10 minutes', 'The 25th Anniversary edition Mazda Miata sold out in just 10 minutes in the U.S.', '', '&lt;p style=&quot;font-size: 16px;&quot;&gt;You can do a lot in 10 minutes. You could boil a pot of spaghetti, go for a jog around the block or, if you’re &lt;a href=&quot;http://driving.ca/mazda/&quot; target=&quot;_blank&quot;&gt;Mazda&lt;/a&gt;, sell out a limited-edition Miata.&lt;/p&gt;&lt;img src=&quot;http://wpmedia.driving.ca/2014/05/25miata.jpg?w=800&amp;amp;h=520&amp;amp;crop=1&quot; /&gt;\r\n&lt;p style=&quot;font-size: 16px;&quot;&gt;Revealed at the New York Auto Show last \r\nmonth, 10 minutes is all it took for all 100 examples of Mazda’s 25th \r\nanniversary edition Miata destined for the U.S. to be spoken for. \r\nOriginally, the automaker expected its pre-order program for U.S. \r\ncustomers to remain open until the end of the month.&lt;/p&gt;\r\n&lt;p style=&quot;font-size: 16px;&quot;&gt;All that is left for the lucky customers \r\nsouth of the border is for Mazda to confirm their intent to purchase the\r\n limited-edition Miata and transmission choices (hint: go for the \r\nmanual) before the cars themselves are shipped to dealers later this \r\nsummer. In total, Mazda plans to build 250 examples of the 25th \r\nAnniversary Miata. Of that pie, 100 are destined for Canada and 84 have \r\nalready been sold, according to Mazda Canada.&lt;/p&gt;\r\n&lt;p style=&quot;font-size: 16px;&quot;&gt;As for the future of the Miata, it is being \r\njointly-developed with Alfa Romeo. Set to debut sometime in 2016, the \r\nMiata will be underpinned by a SkyActiv chassis that is 100 kilograms \r\nlighter than the current one. &lt;/p&gt;', 'Mazda, Miata, Anniversary', 'mazda_miata_25th_anniversary_edition_sold_out_in_10_minutes'),
(27, '2014-05-21 16:06:19', '2014-05-23 12:46:19', 'Brian Turner', 'News', 'Got a traditional key ignition? Then don’t do this', 'Overloading your key chain is not a good idea, regardless of whether you''re driving a recalled GM car or not', '', '&lt;p style=&quot;font-size: 16px;&quot;&gt;A lot of ink has been used lately to cover \r\nGeneral Motors’ ongoing ignition switch recall. Not driving one of the \r\naffected GM models? Well, you shouldn’t relax just because you think \r\nyour daily driver has a more robust system. You might want to look at \r\nyour key-chains. Just as a reminder, the GM vehicles involved are \r\n2005-2010 Chevrolet Cobalts, 2006-2010 HHRs, 2007-2010 Pontiac G5s, \r\n2006-2010 Solstices, 2003-2007 Saturn Ions, and 2007-2010 Sky models.&lt;/p&gt;\r\n&lt;p style=&quot;font-size: 16px;&quot;&gt;Industry analysts and involved stakeholders \r\nseem to agree on the point that the cause of the sudden ignition-off \r\ncondition while driving was narrowed down to a rather simple electric \r\nswitch that couldn’t stand up to the average levels of bumps, shudders, \r\njolts, vibrations, and hits it took in a day. At one time, ignition \r\nswitches used to be fairly heavily built components with large thick \r\ncopper wiring and connectors assembled in a tough hard plastic casing. \r\nThey were bolted securely to the steering column and activated by means \r\nof a steel connecting rod between the ignition lock and the switch.&lt;/p&gt;\r\n&lt;p style=&quot;text-align: center; font-size: 16px;&quot;&gt;&lt;a href=&quot;http://driving.ca/chevrolet/auto-news/news/gm-recall-could-signal-the-demise-of-traditional-car-keys&quot;&gt;&lt;em&gt;&lt;strong&gt;GM recall could signal the demise of traditional car keys&lt;/strong&gt;&lt;/em&gt;&lt;/a&gt;&lt;/p&gt;\r\n&lt;p style=&quot;font-size: 16px;&quot;&gt;The move towards more use of low-voltage \r\nelectronic and security systems in newer vehicles forced an evolution \r\nonto the lowly ignition switch, turning it (for the most part) into a \r\nvery small, light-weight circuit board contact-pad housed in a thin \r\nplastic shell. Lock tumbler ignition cylinders also have evolved into \r\nextinction on some models, being replaced by plastic chip-embedded key \r\nreceivers. Owners of these key systems have reported expensive repairs \r\ncaused by wear on the plastic insert-tip of their keys or damage to the \r\nkeys from people stepping on or dropping them.&lt;/p&gt;', 'Key Ignition, Nissan, Recall', 'got_a_traditional_key_ignition_then_dont_do_this'),
(28, '2014-05-22 14:35:11', '2014-05-23 12:57:13', 'Jodi Lai', 'News', 'Seven budget family sedans with the biggest trunks', 'If you are on a budget, don''t want an\r\n SUV and need a lot of space to haul things, these big sedans with big \r\ntrunks are your best bets', '', '&lt;p style=&quot;font-size: 16px;&quot;&gt;If you golf, play hockey or have a family \r\nthat does all the above, you may often find yourself asking, “How much \r\njunk can I fit in this trunk?” when you’re looking at new cars to buy. \r\nNo, trunk capacity isn’t as sexy as horsepower or a blazing zero to 100 \r\nkm/h time, but it’s a practical specification that is probably more \r\nuseful to more people.&lt;/p&gt;\r\n&lt;p style=&quot;font-size: 16px;&quot;&gt;The common route to go is a big, honking \r\nSUV, but not everyone wants an SUV or a truck and may like something a \r\nbit more compact and manageable. This is where full-sized sedans come \r\ninto play — full-sized sedans have full-sized trunks.&lt;/p&gt;\r\n&lt;p style=&quot;font-size: 16px;&quot;&gt;We’ve looked at all the budget full-sized \r\nfamily sedans under $40,000 on the market to see which ones had the \r\nbiggest trunk capacities, and determined that these seven come out on \r\ntop:&lt;/p&gt;', 'Sedan, SUV', 'seven_budget_family_sedans_with_the_biggest_trunks');

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

CREATE TABLE IF NOT EXISTS `tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tag` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=24 ;

--
-- Dumping data for table `tags`
--

INSERT INTO `tags` (`id`, `tag`) VALUES
(2, 'Nissan'),
(3, 'Recall'),
(4, 'Jaguar'),
(5, 'SUV'),
(6, 'Hybrid'),
(7, 'Key Ignition'),
(8, 'Sedan'),
(9, 'Compact'),
(10, 'Ford'),
(11, 'General Motors'),
(12, 'BMW'),
(13, 'Escape'),
(14, 'Paris Motor Show'),
(15, '2015'),
(16, 'Micra'),
(17, 'Chevrolet'),
(18, 'Aveo'),
(19, 'Anniversary'),
(20, 'Miata'),
(21, 'Mazda'),
(22, 'M3'),
(23, 'M4');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL,
  `username` varchar(8) CHARACTER SET latin1 NOT NULL,
  `password` text CHARACTER SET latin1 NOT NULL,
  `email` varchar(50) CHARACTER SET latin1 NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`,`email`),
  UNIQUE KEY `id` (`id`,`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`) VALUES
(0, 'admin', 'Password1', 'admin@admin.com');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
