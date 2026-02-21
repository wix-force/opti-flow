/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: processexamples
 * Interface for ProcessExamples
 */
export interface ProcessExamples {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  processName?: string;
  /** @wixFieldType text */
  processDescription?: string;
  /** @wixFieldType text */
  commonPainPoint?: string;
  /** @wixFieldType text */
  potentialImpact?: string;
  /** @wixFieldType text */
  category?: string;
}


/**
 * Collection ID: services
 * @catalog This collection is an eCommerce catalog
 * Interface for Services
 */
export interface Services {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  itemName?: string;
  /** @wixFieldType number */
  itemPrice?: number;
  /** @wixFieldType text */
  itemDescription?: string;
  /** @wixFieldType text */
  serviceInclusions?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  itemImage?: string;
}
