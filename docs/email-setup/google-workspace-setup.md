# The Dialogue Platform Email Setup

## Recommended Provider

Use Google Workspace for `thedialogueplatform.com`.

This gives each board member a real professional mailbox that can receive and send from:

`firstname.lastname@thedialogueplatform.com`

The organization details to use during registration:

- Legal name: `DIALOG PLATTFORM`
- Organization number: `935 674 220`
- Country: `Norway`
- Register: `Enhetsregisteret`

## Board Member Accounts

Create these first:

| Person | Email |
| --- | --- |
| Omran Adam | `omran.adam@thedialogueplatform.com` |
| Hind Suliman | `hind.suliman@thedialogueplatform.com` |
| Mohammed Haggar | `mohammed.haggar@thedialogueplatform.com` |
| Adam Bsher | `adam.bsher@thedialogueplatform.com` |
| Gada Ayoub | `gada.ayoub@thedialogueplatform.com` |
| Abduerhman Deiges | `abduerhman.deiges@thedialogueplatform.com` |
| Abdelhadi Krow | `abdelhadi.krow@thedialogueplatform.com` |
| Enas Naseir | `enas.naseir@thedialogueplatform.com` |

Four more board member names are still needed to complete the 12-person setup.

## Shared Addresses

Create these as groups or aliases, not paid user mailboxes unless a real inbox is needed:

| Address | Recommended setup |
| --- | --- |
| `contact@thedialogueplatform.com` | Shared mailbox or alias routed to admin/contact team |
| `board@thedialogueplatform.com` | Google Group containing all board members |
| `admin@thedialogueplatform.com` | Admin mailbox |
| `finance@thedialogueplatform.com` | Alias or shared mailbox |
| `media@thedialogueplatform.com` | Alias or shared mailbox |
| `partnerships@thedialogueplatform.com` | Alias or shared mailbox |

## DNS Records

Add the Google Workspace verification TXT record first. Google will generate the exact value during setup.

After verification, add Google Workspace Gmail MX records exactly as shown in the Google Admin setup screen.

Then add authentication records:

### SPF

TXT record:

```txt
v=spf1 include:_spf.google.com ~all
```

### DKIM

Generate the DKIM key inside Google Admin:

`Apps > Google Workspace > Gmail > Authenticate email`

Then add the DKIM TXT record that Google gives you.

### DMARC

Start with monitoring:

```txt
v=DMARC1; p=none; rua=mailto:admin@thedialogueplatform.com; adkim=s; aspf=s
```

After sending is confirmed to work correctly, upgrade to quarantine:

```txt
v=DMARC1; p=quarantine; rua=mailto:admin@thedialogueplatform.com; adkim=s; aspf=s
```

## Security Rules

- Turn on 2-step verification for every board member.
- Require recovery email and recovery phone during onboarding.
- Make `admin@thedialogueplatform.com` the admin account, not a personal Gmail.
- Keep at least two super admins.
- Do not share passwords through chat.
- Use temporary passwords and require password change at first login.

## Setup Order

1. Create Google Workspace account for `thedialogueplatform.com`.
2. Use `DIALOG PLATTFORM` and organization number `935 674 220`.
3. Verify the domain with the TXT record Google provides.
4. Add Gmail MX records.
5. Create `admin@thedialogueplatform.com`.
6. Create the 12 board member users.
7. Create aliases/groups: `board@`, `contact@`, `finance@`, `media@`, `partnerships@`.
8. Add SPF, DKIM, and DMARC.
9. Test sending from each mailbox.
10. Test receiving to each mailbox.

## Still Needed

- The remaining 4 board member names.
- Confirmation whether `contact@thedialogueplatform.com` should be a paid inbox or just forward/group delivery.
- Access to the domain DNS provider during Google Workspace setup.
