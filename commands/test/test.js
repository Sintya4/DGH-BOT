module.exports = {
        name: "test",
        usage: `usage`,
        category: "category",
        description: "",
        args: false,
        cooldown: 0,
        permission: "",
    run: async (client, message, args) => {
//code
 var remainingTime = 25, remainingCount = 1, status = 'working';

  var countdown = await message.channel.send(`

    started! ${remainingTime} minutes

  `);

  let clock = setInterval(() => {

    remainingTime--;

    if (remainingTime == 1)

        remainingCount++;

    countdown.edit(`

      ${remainingTime} minutes remain. :: ${status} ::

    `);

    if (remainingCount == 10) {

        clearInterval(clock);

    }

    if (remainingTime == 0 && remainingCount % 2 == 0) {

        status = 'timeout';

        remainingTime += 5;

    }

    // looks like dirty code but this works instead of

    // else { status = 'working' if ... }

    else if (remainingTime == 0 && remainingCount == 9) {

        remainingTime += 20;

        status = 'working';

    }

    else if (remainingTime == 0) {

        remainingTime += 25;

        status = 'working';

    }

  }, 10000);

      
      
}}