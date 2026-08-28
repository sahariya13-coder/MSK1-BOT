module.exports.config = {
  name: "joinnoti",
  eventType: ["log:subscribe"],
  version: "1.0.0",
  credits: "MSK",
  description: "Welcome message without media attachment",
  dependencies: {
    "fs-extra": "",
    "path": ""
  }
};

module.exports.run = async function({ api, event }) {
  const { threadID } = event;
  
  const botPrefix = global.config.PREFIX || "/";
  const botName = global.config.BOTNAME || "𝗠𝗦𝗞 𝗖𝗵𝗮𝘁 𝗕𝗼𝘁";

  // বট নিজে কোনো গ্রুপে যুক্ত হলে এই মেসেজ পাঠাবে
  if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
    await api.changeNickname(`[ ${botPrefix} ] • ${botName}`, threadID, api.getCurrentUserID());

    const botJoinMsg = `চলে এসেছি 𝗠𝗦𝗞 𝗖𝗵𝗮𝘁 𝗕𝗼𝘁, এখন তোমাদের সাথে আড্ডা দিব..!

╭•┄┅═══❁🌺❁═══┅┄•╮
     আসসালামু আলাইকুম💚
╰•┄┅═══❁🌺❁═══┅┄•╯

Thank you so much for adding me to your group-🖤🤗
I will always serve you inshallah 🌺❤️

To view any command:
${botPrefix}Help
${botPrefix}Info
${botPrefix}Admin

★ যেকোনো অভিযোগ অথবা হেল্প এর জন্য এডমিন MSK কে নক করতে পারেন ★

❖⋆═══════════════════════⋆❖
          Bot Owner ➢ SHAHARIYAR`;

    return api.sendMessage(botJoinMsg, threadID);
  }

  // নতুন মেম্বার জয়েন করলে এই মেসেজ পাঠাবে
  try {
    let { threadName, participantIDs } = await api.getThreadInfo(threadID);
    const threadData = global.data.threadData.get(parseInt(threadID)) || {};
    let mentions = [], nameArray = [], memLength = [], i = 0;

    for (let id in event.logMessageData.addedParticipants) {
      const userName = event.logMessageData.addedParticipants[id].fullName;
      nameArray.push(userName);
      mentions.push({ tag: userName, id });
      memLength.push(participantIDs.length - i++);
    }
    memLength.sort((a, b) => a - b);

    let msg = (typeof threadData.customJoin === "undefined") ? `╭•┄┅═══❁🌺❁═══┅┄•╮
     আসসালামু আলাইকুম💚
╰•┄┅═══❁🌺❁═══┅┄•╯
হাসি, মজা, ঠাট্টায় গড়ে উঠুক  
চিরস্থায়ী বন্ধুত্বের বন্ধন।🥰
ভালোবাসা ও সম্পর্ক থাকুক আজীবন।💝

➤ আশা করি আপনি এখানে হাসি-মজা করে 
আড্ডা দিতে ভালোবাসবেন।😍
➤ সবার সাথে মিলেমিশে থাকবেন।😉
➤ উস্কানিমূলক কথা বা খারাপ ব্যবহার করবেন না।🚫
➤ গ্রুপ এডমিনের কথা শুনবেন ও রুলস মেনে চলবেন।✅

›› প্রিয় {name},  
আপনি এই গ্রুপের {soThanhVien} নম্বর মেম্বার!

›› গ্রুপ: {threadName}

💌 🌺 𝐖 𝐄 𝐋 𝐂 𝐎 𝐌 𝐄 🌺 💌
╭─╼╾─╼🌸╾─╼╾───╮
   ─꯭─⃝‌‌𝗠𝗦𝗞 𝗖𝗵𝗮𝘁 𝗕𝗼𝘁 🌺
╰───╼╾─╼🌸╾─╼╾─╯

★ যেকোনো অভিযোগ অথবা হেল্প এর জন্য এডমিন MSK কে নক করতে পারেন ★

❖⋆══════════════════════════⋆❖` : threadData.customJoin;

    msg = msg
      .replace(/\{name}/g, nameArray.join(', '))
      .replace(/\{soThanhVien}/g, memLength.join(', '))
      .replace(/\{threadName}/g, threadName);

    return api.sendMessage({ body: msg, mentions }, threadID);
  } catch (e) {
    console.error(e);
  }
};
