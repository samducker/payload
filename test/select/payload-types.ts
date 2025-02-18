/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

/**
 * Supported timezones in IANA format.
 *
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "supportedTimezones".
 */
export type SupportedTimezones =
  | 'Pacific/Midway'
  | 'Pacific/Niue'
  | 'Pacific/Honolulu'
  | 'Pacific/Rarotonga'
  | 'America/Anchorage'
  | 'Pacific/Gambier'
  | 'America/Los_Angeles'
  | 'America/Tijuana'
  | 'America/Denver'
  | 'America/Phoenix'
  | 'America/Chicago'
  | 'America/Guatemala'
  | 'America/New_York'
  | 'America/Bogota'
  | 'America/Caracas'
  | 'America/Santiago'
  | 'America/Buenos_Aires'
  | 'America/Sao_Paulo'
  | 'Atlantic/South_Georgia'
  | 'Atlantic/Azores'
  | 'Atlantic/Cape_Verde'
  | 'Europe/London'
  | 'Europe/Berlin'
  | 'Africa/Lagos'
  | 'Europe/Athens'
  | 'Africa/Cairo'
  | 'Europe/Moscow'
  | 'Asia/Riyadh'
  | 'Asia/Dubai'
  | 'Asia/Baku'
  | 'Asia/Karachi'
  | 'Asia/Tashkent'
  | 'Asia/Calcutta'
  | 'Asia/Dhaka'
  | 'Asia/Almaty'
  | 'Asia/Jakarta'
  | 'Asia/Bangkok'
  | 'Asia/Shanghai'
  | 'Asia/Singapore'
  | 'Asia/Tokyo'
  | 'Asia/Seoul'
  | 'Australia/Sydney'
  | 'Pacific/Guam'
  | 'Pacific/Noumea'
  | 'Pacific/Auckland'
  | 'Pacific/Fiji';

export interface Config {
  auth: {
    users: UserAuthOperations;
  };
  blocks: {};
  collections: {
    posts: Post;
    'localized-posts': LocalizedPost;
    'versioned-posts': VersionedPost;
    'deep-posts': DeepPost;
    pages: Page;
    points: Point;
    upload: Upload;
    rels: Rel;
    users: User;
    'payload-locked-documents': PayloadLockedDocument;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  collectionsJoins: {};
  collectionsSelect: {
    posts: PostsSelect<false> | PostsSelect<true>;
    'localized-posts': LocalizedPostsSelect<false> | LocalizedPostsSelect<true>;
    'versioned-posts': VersionedPostsSelect<false> | VersionedPostsSelect<true>;
    'deep-posts': DeepPostsSelect<false> | DeepPostsSelect<true>;
    pages: PagesSelect<false> | PagesSelect<true>;
    points: PointsSelect<false> | PointsSelect<true>;
    upload: UploadSelect<false> | UploadSelect<true>;
    rels: RelsSelect<false> | RelsSelect<true>;
    users: UsersSelect<false> | UsersSelect<true>;
    'payload-locked-documents': PayloadLockedDocumentsSelect<false> | PayloadLockedDocumentsSelect<true>;
    'payload-preferences': PayloadPreferencesSelect<false> | PayloadPreferencesSelect<true>;
    'payload-migrations': PayloadMigrationsSelect<false> | PayloadMigrationsSelect<true>;
  };
  db: {
    defaultIDType: string;
  };
  globals: {
    'global-post': GlobalPost;
  };
  globalsSelect: {
    'global-post': GlobalPostSelect<false> | GlobalPostSelect<true>;
  };
  locale: 'en' | 'de';
  user: User & {
    collection: 'users';
  };
  jobs: {
    tasks: unknown;
    workflows: unknown;
  };
}
export interface UserAuthOperations {
  forgotPassword: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
    password: string;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "posts".
 */
export interface Post {
  id: string;
  text?: string | null;
  number?: number | null;
  select?: ('a' | 'b') | null;
  selectMany?: ('a' | 'b')[] | null;
  group?: {
    text?: string | null;
    number?: number | null;
  };
  array?:
    | {
        text?: string | null;
        number?: number | null;
        id?: string | null;
      }[]
    | null;
  blocks?:
    | (
        | {
            text?: string | null;
            introText?: string | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'intro';
          }
        | {
            text?: string | null;
            ctaText?: string | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'cta';
          }
      )[]
    | null;
  tab?: {
    text?: string | null;
    number?: number | null;
  };
  unnamedTabText?: string | null;
  unnamedTabNumber?: number | null;
  hasOne?: (string | null) | Rel;
  hasMany?: (string | Rel)[] | null;
  hasManyUpload?: (string | Upload)[] | null;
  hasOnePoly?: {
    relationTo: 'rels';
    value: string | Rel;
  } | null;
  hasManyPoly?:
    | {
        relationTo: 'rels';
        value: string | Rel;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "rels".
 */
export interface Rel {
  id: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "upload".
 */
export interface Upload {
  id: string;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "localized-posts".
 */
export interface LocalizedPost {
  id: string;
  text?: string | null;
  number?: number | null;
  select?: ('a' | 'b') | null;
  selectMany?: ('a' | 'b')[] | null;
  group?: {
    text?: string | null;
    number?: number | null;
  };
  groupSecond?: {
    text?: string | null;
    number?: number | null;
  };
  array?:
    | {
        text?: string | null;
        number?: number | null;
        id?: string | null;
      }[]
    | null;
  arraySecond?:
    | {
        text?: string | null;
        number?: number | null;
        id?: string | null;
      }[]
    | null;
  blocks?:
    | (
        | {
            text?: string | null;
            introText?: string | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'intro';
          }
        | {
            text?: string | null;
            ctaText?: string | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'cta';
          }
      )[]
    | null;
  blocksSecond?:
    | (
        | {
            text?: string | null;
            firstText?: string | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'first';
          }
        | {
            text?: string | null;
            secondText?: string | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'second';
          }
      )[]
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "versioned-posts".
 */
export interface VersionedPost {
  id: string;
  text?: string | null;
  number?: number | null;
  array?:
    | {
        text?: string | null;
        id?: string | null;
      }[]
    | null;
  blocks?:
    | {
        text?: string | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'test';
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "deep-posts".
 */
export interface DeepPost {
  id: string;
  group?: {
    array?:
      | {
          group?: {
            text?: string | null;
            number?: number | null;
          };
          id?: string | null;
        }[]
      | null;
    blocks?:
      | {
          text?: string | null;
          number?: number | null;
          id?: string | null;
          blockName?: string | null;
          blockType: 'block';
        }[]
      | null;
  };
  arrayTop?:
    | {
        text?: string | null;
        arrayNested?:
          | {
              text?: string | null;
              number?: number | null;
              id?: string | null;
            }[]
          | null;
        id?: string | null;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages".
 */
export interface Page {
  id: string;
  relatedPage?: (string | null) | Page;
  content?:
    | {
        title: string;
        link: {
          docPoly?: {
            relationTo: 'pages';
            value: string | Page;
          } | null;
          doc?: (string | null) | Page;
          docMany?: (string | Page)[] | null;
          docHasManyPoly?:
            | {
                relationTo: 'pages';
                value: string | Page;
              }[]
            | null;
          label: string;
        };
        richTextLexical?: {
          root: {
            type: string;
            children: {
              type: string;
              version: number;
              [k: string]: unknown;
            }[];
            direction: ('ltr' | 'rtl') | null;
            format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
            indent: number;
            version: number;
          };
          [k: string]: unknown;
        } | null;
        richTextSlate?:
          | {
              [k: string]: unknown;
            }[]
          | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'introduction';
      }[]
    | null;
  slug: string;
  additional?: string | null;
  array?:
    | {
        title?: string | null;
        other?: string | null;
        id?: string | null;
      }[]
    | null;
  blocks?:
    | {
        title?: string | null;
        other?: string | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'some';
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "points".
 */
export interface Point {
  id: string;
  text?: string | null;
  /**
   * @minItems 2
   * @maxItems 2
   */
  point?: [number, number] | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: string;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents".
 */
export interface PayloadLockedDocument {
  id: string;
  document?:
    | ({
        relationTo: 'posts';
        value: string | Post;
      } | null)
    | ({
        relationTo: 'localized-posts';
        value: string | LocalizedPost;
      } | null)
    | ({
        relationTo: 'versioned-posts';
        value: string | VersionedPost;
      } | null)
    | ({
        relationTo: 'deep-posts';
        value: string | DeepPost;
      } | null)
    | ({
        relationTo: 'pages';
        value: string | Page;
      } | null)
    | ({
        relationTo: 'points';
        value: string | Point;
      } | null)
    | ({
        relationTo: 'upload';
        value: string | Upload;
      } | null)
    | ({
        relationTo: 'rels';
        value: string | Rel;
      } | null)
    | ({
        relationTo: 'users';
        value: string | User;
      } | null);
  globalSlug?: string | null;
  user: {
    relationTo: 'users';
    value: string | User;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: string;
  user: {
    relationTo: 'users';
    value: string | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: string;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "posts_select".
 */
export interface PostsSelect<T extends boolean = true> {
  text?: T;
  number?: T;
  select?: T;
  selectMany?: T;
  group?:
    | T
    | {
        text?: T;
        number?: T;
      };
  array?:
    | T
    | {
        text?: T;
        number?: T;
        id?: T;
      };
  blocks?:
    | T
    | {
        intro?:
          | T
          | {
              text?: T;
              introText?: T;
              id?: T;
              blockName?: T;
            };
        cta?:
          | T
          | {
              text?: T;
              ctaText?: T;
              id?: T;
              blockName?: T;
            };
      };
  tab?:
    | T
    | {
        text?: T;
        number?: T;
      };
  unnamedTabText?: T;
  unnamedTabNumber?: T;
  hasOne?: T;
  hasMany?: T;
  hasManyUpload?: T;
  hasOnePoly?: T;
  hasManyPoly?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "localized-posts_select".
 */
export interface LocalizedPostsSelect<T extends boolean = true> {
  text?: T;
  number?: T;
  select?: T;
  selectMany?: T;
  group?:
    | T
    | {
        text?: T;
        number?: T;
      };
  groupSecond?:
    | T
    | {
        text?: T;
        number?: T;
      };
  array?:
    | T
    | {
        text?: T;
        number?: T;
        id?: T;
      };
  arraySecond?:
    | T
    | {
        text?: T;
        number?: T;
        id?: T;
      };
  blocks?:
    | T
    | {
        intro?:
          | T
          | {
              text?: T;
              introText?: T;
              id?: T;
              blockName?: T;
            };
        cta?:
          | T
          | {
              text?: T;
              ctaText?: T;
              id?: T;
              blockName?: T;
            };
      };
  blocksSecond?:
    | T
    | {
        first?:
          | T
          | {
              text?: T;
              firstText?: T;
              id?: T;
              blockName?: T;
            };
        second?:
          | T
          | {
              text?: T;
              secondText?: T;
              id?: T;
              blockName?: T;
            };
      };
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "versioned-posts_select".
 */
export interface VersionedPostsSelect<T extends boolean = true> {
  text?: T;
  number?: T;
  array?:
    | T
    | {
        text?: T;
        id?: T;
      };
  blocks?:
    | T
    | {
        test?:
          | T
          | {
              text?: T;
              id?: T;
              blockName?: T;
            };
      };
  updatedAt?: T;
  createdAt?: T;
  _status?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "deep-posts_select".
 */
export interface DeepPostsSelect<T extends boolean = true> {
  group?:
    | T
    | {
        array?:
          | T
          | {
              group?:
                | T
                | {
                    text?: T;
                    number?: T;
                  };
              id?: T;
            };
        blocks?:
          | T
          | {
              block?:
                | T
                | {
                    text?: T;
                    number?: T;
                    id?: T;
                    blockName?: T;
                  };
            };
      };
  arrayTop?:
    | T
    | {
        text?: T;
        arrayNested?:
          | T
          | {
              text?: T;
              number?: T;
              id?: T;
            };
        id?: T;
      };
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages_select".
 */
export interface PagesSelect<T extends boolean = true> {
  relatedPage?: T;
  content?:
    | T
    | {
        introduction?:
          | T
          | {
              title?: T;
              link?:
                | T
                | {
                    docPoly?: T;
                    doc?: T;
                    docMany?: T;
                    docHasManyPoly?: T;
                    label?: T;
                  };
              richTextLexical?: T;
              richTextSlate?: T;
              id?: T;
              blockName?: T;
            };
      };
  slug?: T;
  additional?: T;
  array?:
    | T
    | {
        title?: T;
        other?: T;
        id?: T;
      };
  blocks?:
    | T
    | {
        some?:
          | T
          | {
              title?: T;
              other?: T;
              id?: T;
              blockName?: T;
            };
      };
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "points_select".
 */
export interface PointsSelect<T extends boolean = true> {
  text?: T;
  point?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "upload_select".
 */
export interface UploadSelect<T extends boolean = true> {
  updatedAt?: T;
  createdAt?: T;
  url?: T;
  thumbnailURL?: T;
  filename?: T;
  mimeType?: T;
  filesize?: T;
  width?: T;
  height?: T;
  focalX?: T;
  focalY?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "rels_select".
 */
export interface RelsSelect<T extends boolean = true> {
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users_select".
 */
export interface UsersSelect<T extends boolean = true> {
  updatedAt?: T;
  createdAt?: T;
  email?: T;
  resetPasswordToken?: T;
  resetPasswordExpiration?: T;
  salt?: T;
  hash?: T;
  loginAttempts?: T;
  lockUntil?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents_select".
 */
export interface PayloadLockedDocumentsSelect<T extends boolean = true> {
  document?: T;
  globalSlug?: T;
  user?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences_select".
 */
export interface PayloadPreferencesSelect<T extends boolean = true> {
  user?: T;
  key?: T;
  value?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations_select".
 */
export interface PayloadMigrationsSelect<T extends boolean = true> {
  name?: T;
  batch?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "global-post".
 */
export interface GlobalPost {
  id: string;
  text?: string | null;
  number?: number | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "global-post_select".
 */
export interface GlobalPostSelect<T extends boolean = true> {
  text?: T;
  number?: T;
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}


declare module 'payload' {
  // @ts-ignore 
  export interface GeneratedTypes extends Config {}
}