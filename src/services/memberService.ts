import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase.rn.config';

class MemberService {
  // Initialize member data (placeholder for now)
  static async initializeMemberData(): Promise<void> {
    console.log('Member data initialization placeholder');
  }

  // Verify if a member number exists in the system
  static async verifyMemberNumber(memberNumber: string): Promise<boolean> {
    try {
      // This would typically check against a members collection
      // For now, we'll simulate some validation
      if (!memberNumber || memberNumber.trim() === '') {
        return false;
      }
      
      // Simple validation - member numbers should start with "member" followed by numbers
      const memberRegex = /^member\d+$/i;
      return memberRegex.test(memberNumber);
    } catch (error) {
      console.error('Error verifying member number:', error);
      return false;
    }
  }

  // Check if a member number is already taken by a user
  static async isMemberNumberTaken(memberNumber: string): Promise<boolean> {
    try {
      // Check if any user has this member number
      const usersQuery = await getDoc(doc(db, 'memberNumbers', memberNumber));
      return usersQuery.exists();
    } catch (error) {
      console.error('Error checking if member number is taken:', error);
      return false;
    }
  }

  // Link a member number to a user
  static async linkMemberToUser(memberNumber: string, userId: string): Promise<void> {
    try {
      await setDoc(doc(db, 'memberNumbers', memberNumber), {
        userId: userId,
        linkedAt: new Date()
      });
    } catch (error) {
      console.error('Error linking member to user:', error);
      throw error;
    }
  }

  // Get user by member number
  static async getUserByMemberNumber(memberNumber: string): Promise<string | null> {
    try {
      const memberDoc = await getDoc(doc(db, 'memberNumbers', memberNumber));
      if (memberDoc.exists()) {
        return memberDoc.data().userId;
      }
      return null;
    } catch (error) {
      console.error('Error getting user by member number:', error);
      return null;
    }
  }

  // Create a new member record
  static async createMember(memberData: {
    memberNumber: string;
    firstName: string;
    lastName: string;
    idNumber: string;
    joinDate: Date;
  }): Promise<void> {
    try {
      await setDoc(doc(db, 'members', memberData.memberNumber), {
        ...memberData,
        createdAt: new Date(),
        updatedAt: new Date(),
        status: 'active'
      });
    } catch (error) {
      console.error('Error creating member:', error);
      throw error;
    }
  }

  // Get member details
  static async getMember(memberNumber: string): Promise<any> {
    try {
      const memberDoc = await getDoc(doc(db, 'members', memberNumber));
      if (memberDoc.exists()) {
        return memberDoc.data();
      }
      return null;
    } catch (error) {
      console.error('Error getting member:', error);
      return null;
    }
  }
}

export default MemberService;
