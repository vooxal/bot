import { FireMessage } from "../../lib/extensions/message";
import { Listener } from "../../lib/util/listener";
import { Command } from "../../lib/util/command";
import { PermissionString } from "discord.js";

export default class MissingPermissions extends Listener {
  constructor() {
    super("missingPermissions", {
      emitter: "commandHandler",
      event: "missingPermissions",
    });
  }

  async exec(
    message: FireMessage,
    command: Command,
    type: "client" | "user",
    missing: PermissionString[]
  ) {
    const cleanPermissions = missing.map((name) =>
      this.client.util.cleanPermissionName(name, message.language)
    );

    if (type == "client")
      return await message.error(
        "MISSING_PERMISSIONS_CLIENT",
        cleanPermissions,
        message.util?.parsed?.alias || command.id
      );
    else if (type == "user")
      return await message.error(
        "MISSING_PERMISSIONS_USER",
        cleanPermissions,
        message.util?.parsed?.alias || command.id
      );
  }
}